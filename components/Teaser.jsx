import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const Excerpt = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`

const ImagePlaceholder = styled.div`
  padding: 0px;
  border: medium none;
  display: block;
  width: 128px;
  height: 0px;
  min-height: 100%;
  max-height: 100%;
`

const TeaserImage = styled(Image)``

const CardTitle = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;

  & small {
    opacity: 0.5;
    font-style: italic;
    text-align: end;
    padding: 0 0.25rem;
  }
`

const TeaserCard = styled.div`
  display: flex;
  max-width: 1024px;
  flex-direction: column;
  flex: 10;
  padding: 0.25rem;
  cursor: pointer;

  & h2 {
    font-size: 2rem;
    font-weight: 100;
    line-height: 1.6rem;
    color: var(--text-default);
    margin-bottom: 4px;
  }

  & p {
    flex: 1;
    font-style: italic;
    opacity: 0.5;
    margin-bottom: 1rem;
  }
`

const TeaserContainer = styled.article`
  display: flex;
  justify-content: center;
  height: 7rem;
  border-radius: 2px;
  margin: 2rem 2rem;

  &:hover {
    color: var(--accent);
    & h2 {
      color: var(--accent);
    }
  }
`

export default function Teaser({ post }) {
  const { title, slug, date, excerpt, image, caption } = post

  return (
    <Link href={`/blog/${slug}`} prefetch={false}>
      <TeaserContainer>
        <TeaserCard>
          <CardTitle>
            <h2>{title}</h2>
            <small>{date}</small>
          </CardTitle>
          <Excerpt>
            <p>{excerpt}</p>
          </Excerpt>
        </TeaserCard>
        {image ? (
          <TeaserImage
            src={`/media/${image}`}
            height={128}
            width={128}
            alt={caption}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </TeaserContainer>
    </Link>
  )
}
