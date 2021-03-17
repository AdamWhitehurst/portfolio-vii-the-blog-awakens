import mdxComponents from '@components/MdxComponents'
import MDXContainer from '@components/MDXContainer'
import BlogPostLayout from '@layouts/blog-post-layout'
import { getFileBySlug, getFiles } from '@lib/mdx'
import { getMDXComponent } from 'mdx-bundler/client'
import * as React from 'react'

export default function BlogPost({ mdxSource, frontMatter }) {
  const Component = React.useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return (
    <BlogPostLayout frontMatter={frontMatter}>
      <MDXContainer>
        <Component components={mdxComponents} />
      </MDXContainer>
    </BlogPostLayout>
  )
}

export async function getStaticPaths() {
  let posts = await getFiles('blog')

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.md/, '')
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('blog', params.slug)

  return { props: post }
}
