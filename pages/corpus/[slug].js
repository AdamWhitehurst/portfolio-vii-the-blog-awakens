import mdxComponents from '@components/MdxComponents'
import MDXContainer from '@components/MDXContainer'
import PostLayout from '@layouts/post-layout'
import { getFileBySlug, getFiles } from '@lib/mdx'
import { getMDXComponent } from 'mdx-bundler/client'
import * as React from 'react'

export default function Post({ mdxSource, frontMatter }) {
  const Component = React.useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return (
    <PostLayout frontMatter={frontMatter}>
      <MDXContainer>
        <Component components={mdxComponents} />
      </MDXContainer>
    </PostLayout>
  )
}

export async function getStaticPaths() {
  let posts = await getFiles('corpus')

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
  const post = await getFileBySlug('corpus', params.slug)

  return { props: post }
}
