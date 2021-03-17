import MDXContainer from '@components/MDXContainer'
import SEO from '@components/SEO'
import TopBtnLayout from '@layouts/top-btn'
import styled from 'styled-components'

const TitleWatermark = styled.p`
  margin-left: 1.5rem;
  text-align: center;
  font-style: italic;
  font-size: 2rem;
  line-height: 2rem;
  color: var(--accent);
  white-space: nowrap;
  width: min-content;
  transform: translateX(-50%) rotate(0.25turn) translateX(-50%);
  position: relative;
  bottom: 0;
  z-index: -10;
  filter: blur(1px) opacity(10%) invert();
  position: fixed;
`
const PostH1 = styled.h1`
  margin-left: 1.25rem;
  text-align: center;
  font-style: italic;
  font-size: 3rem;
  line-height: 2rem;
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
    <>
      <TitleWatermark>{title}</TitleWatermark>
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
        <PostH1>{title}</PostH1>
        <Center>
          <MDXContainer>{children}</MDXContainer>
        </Center>
      </TopBtnLayout>
    </>
  )
}
