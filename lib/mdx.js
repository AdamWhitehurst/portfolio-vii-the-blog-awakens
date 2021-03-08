import MdxComponents from '@components/MdxComponents'
import fs from 'fs'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import readingTime from 'reading-time'
import wikiLinkPlugin from 'remark-wiki-link'

const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
const root = process.cwd()

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, 'data', type))
}

export async function getFileBySlug(type, slug) {
  let source
  try {
    source = slug
      ? fs.readFileSync(path.join(root, 'data', type, `${slug}.mdx`), 'utf8')
      : fs.readFileSync(path.join(root, 'data', `${type}.mdx`), 'utf8')
  } catch (e) {
    source = fs.readFileSync(path.join(root, 'data', `404.mdx`), 'utf8')
  }
  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, {
    components: MdxComponents,

    mdxOptions: {
      remarkPlugins: [
        [
          wikiLinkPlugin,
          {
            permalinks: ['cardano', 'polkadot'],
            pageResolver: (name) => {
              console.log(name)
              return [name.replace(/ /g, '_').toLowerCase()]
            },
            hrefTemplate: (permalink) => `/blog/${permalink}`,
            aliasDivider: '|'
          }
        ],
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles')
        // [require('remark-wiki-link').wikiLinkPlugin, {
        // https://github.com/landakram/remark-wiki-link#configuration-options
        // }],
      ]
      // rehypePlugins: [mdxPrism],
    }
  })

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
      date: data?.date?.toLocaleDateString('en-us', dateOptions) || null
    }
  }
}

export async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, 'data', type))

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(path.join(root, 'data', type, postSlug), 'utf8')
    const { data } = matter(source)

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
        date: data?.date?.toLocaleDateString('en-us', dateOptions) || null
      },
      ...allPosts
    ]
  }, [])
}
