import fs from 'fs'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
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

  const { code, frontmatter } = await getMDX(source)

  return {
    mdxSource: code,
    frontMatter: {
      wordCount: code.split(/\s+/gu).length,
      readingTime: readingTime(code),
      slug: slug || null,
      ...frontmatter,
      date: frontmatter.date.toLocaleDateString('en-us', dateOptions)
    }
  }
}

async function getMDX(source) {
  return await bundleMDX(source, {
    xdmOptions(input, options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [
          require('remark-wiki-link').wikiLinkPlugin,
          {
            pageResolver: (name) => [name.replace(/ /g, '_').toLowerCase()],
            hrefTemplate: (permalink) => `/blog/${permalink}`,
            aliasDivider: '|'
          }
        ],
        () => (tree) => {
          // Visits `![[ ]]` type nodes after `remark-wiki-link` has processed them.
          visit(
            tree,
            {
              type: 'text'
            },
            (e, i, p) => {
              let match = e.value.match(/!\[\[([^[\]]*)\]\]/gu)

              if (match) {
                const newChildren = match.reduce(
                  (acc, m) => [
                    ...acc,
                    u('image', {
                      alt: m.slice(3, m.length - 2),
                      url: `/media/${m.slice(3, m.length - 2)}`
                    }),
                    u('br')
                  ],
                  []
                )
                p.children.splice(i, 1, ...newChildren)
              }
            }
          )
        },
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles')
      ]
      options.rehypePlugins = [...(options.rehypePlugins ?? [])]

      return options
    }
  })
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
