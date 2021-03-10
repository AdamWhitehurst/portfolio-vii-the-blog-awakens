import MdxComponents from '@components/MdxComponents'
import MDXContainer from '@components/MDXContainer'
import BlogPostLayout from '@layouts/blog-post-layout'
import { getFileBySlug, getFiles } from '@lib/mdx'
import hydrate from 'next-mdx-remote/hydrate'

export default function BlogPost({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MdxComponents
  })

  return (
    <BlogPostLayout frontMatter={frontMatter}>
      <MDXContainer>{content}</MDXContainer>
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
