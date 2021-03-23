import Teaser from '@components/Teaser'
import CorpusListLayout from '@layouts/corpus-list-layout'
import { readFilesFrontMatter } from '@lib/mdx'

const PostTeaser = (post) => <Teaser key={post.slug} post={post} />

export default function CorpusIndex({ posts }) {
  return <CorpusListLayout>{posts.map(PostTeaser)}</CorpusListLayout>
}

export async function getStaticProps() {
  const posts = await readFilesFrontMatter('corpus')

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
