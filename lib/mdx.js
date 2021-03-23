import fs from 'fs'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import path from 'path'
import readingTime from 'reading-time'
import u from 'unist-builder'
import visit from 'unist-util-visit'

const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
const root = process.cwd()

export const readFiles = (dir) => fs.readdirSync(path.join(root, 'data', dir))

/**
 * @param {string} dir
 * @returns {any[]}
 */
export const readFilesFrontMatter = (dir) =>
  readFiles(dir).reduce((fmFiles, file) => {
    const { data } = matter(
      fs.readFileSync(path.join(root, 'data', dir, file), 'utf8')
    )

    return [
      {
        ...data,
        slug: file.replace('.md', ''),
        date: data?.date?.toLocaleDateString('en-us', dateOptions) || null
      },
      ...fmFiles
    ]
  }, [])

export async function getFileBySlug(type, slug) {
  let source
  try {
    source = slug
      ? fs.readFileSync(path.join(root, 'data', type, `${slug}.md`), 'utf8')
      : fs.readFileSync(path.join(root, 'data', `${type}.md`), 'utf8')
  } catch (e) {
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
            pageResolver: (name) => {
              return [name.replace(/ /g, '_').toLowerCase()]
            },
            hrefTemplate: (permalink) => `/corpus/${permalink}`,
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
