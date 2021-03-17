import Teaser from '@components/Teaser'
import BlogListLayout from '@layouts/blog-list-layout'
import { getAllFilesFrontMatter } from '@lib/mdx'

const PostTeaser = (post) => <Teaser key={post.slug} post={post} />

export default function BlogIndex({ posts }) {
  return <BlogListLayout>{posts.map(PostTeaser)}</BlogListLayout>
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  const sortedPosts = posts
    .filter((post) => !post?.draft && post?.article)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reverse()

  return {
    props: {
      posts: sortedPosts
    }
  }
}
