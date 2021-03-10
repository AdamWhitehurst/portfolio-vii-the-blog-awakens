import MDXContainer from '@components/MDXContainer'
import SEO from '@components/SEO'
import TopBtnLayout from '@layouts/top-btn'
import styled from 'styled-components'

const PostH1 = styled.h1`
  margin-left: 1.25rem;
  text-align: center;
  font-style: italic;
  font-size: 3rem;
  color: var(--accent);
`

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export default function BlogPostLayout(props) {
  const { children, frontMatter } = props
  const {
    title,
    date,
    readingTime,
    slug,
    image,
    caption,
    excerpt,
    draft
  } = frontMatter

  return (
    <TopBtnLayout>
      <SEO
        customMeta={{
          title: title,
          description: excerpt,
          type: 'article',
          image: image,
          date: date
        }}
        noIndex={!!draft}
      />
      <Center>
        <MDXContainer>
          <PostH1>{title}</PostH1>
          {children}
        </MDXContainer>
      </Center>
    </TopBtnLayout>
  )
}
