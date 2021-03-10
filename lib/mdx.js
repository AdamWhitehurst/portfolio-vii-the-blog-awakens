import MdxComponents from '@components/MdxComponents'
import fs from 'fs'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import readingTime from 'reading-time'
import u from 'unist-builder'
import visit from 'unist-util-visit'

const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
const root = process.cwd()

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, 'data', type))
}

export async function getFileBySlug(type, slug) {
  let source
  try {
    source = slug
      ? fs.readFileSync(path.join(root, 'data', type, `${slug}.md`), 'utf8')
      : fs.readFileSync(path.join(root, 'data', `${type}.md`), 'utf8')
  } catch (e) {
    console.log(e)
    source = fs.readFileSync(path.join(root, 'data', `404.md`), 'utf8')
  }
  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, {
    components: MdxComponents,

    mdxOptions: {
      remarkPlugins: [
        () => (tree) => {
          // Visits `![[ ]]` type nodes after `remark-wiki-link` has processed them.
          visit(
            tree,
            {
              type: 'wikiLink'
            },
            (e, i, p) => {
              if (i !== 0 && p.children?.length >= 2) {
                const exclamation = p.children[i - 1]

                if (exclamation.value === '!') {
                  const newChildren = [
                    u('image', { alt: e.value, url: `/media/${e.value}` }),
                    u('br')
                  ]
                  p.children.splice(i - 1, 2, ...newChildren)
                }
              }
            }
          )
        },
        // () => (tree) => {
        //   // Visits wikiLink nodes and formats them prettiful
        //   visit(tree, 'wikiLink', (e, i, p) => {
        //     const newValue = e.value
        //       .split('_')
        //       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        //       .join(' ')
        //     e.data.alias = newValue
        //     e.data.permalink = newValue
        //     if (e.data?.hChildren?.[0]?.value) {
        //       e.data.hChildren[0].value = newValue
        //     }
        //   })
        // },
        require('remark-slug'),
        require('remark-autolink-headings'),
        require('remark-code-titles'),
        [
          require('remark-wiki-link'),
          {
            pageResolver: (name) => [name.replace(/ /g, '_').toLowerCase()],
            hrefTemplate: (permalink) => `/blog/${permalink}`,
            aliasDivider: '|'
          }
        ]
      ]
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
        slug: postSlug.replace('.md', ''),
        date: data?.date?.toLocaleDateString('en-us', dateOptions) || null
      },
      ...allPosts
    ]
  }, [])
}
