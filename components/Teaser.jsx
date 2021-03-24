import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const SmallDate = styled.small`
  text-align: left;
  width: max-content;
  opacity: 0.5;
  font-style: italic;
  text-align: end;
  padding-right: 4px;
`

const ImageContainer = styled.div`
  position: relative;
  left: 0px;
  z-index: 10;
  @media only screen and (max-width: 720px) {
    display: none !important;
  }
`

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
  background-color: var(--accent);
  opacity: 0.5;
  @media only screen and (max-width: 720px) {
    display: none !important;
  }
`

const TeaserImage = styled(Image)``

const CardTitle = styled.div`
  width: 100%;
  display: flex;
  @media only screen and (max-width: 720px) {
    flex-direction: column-reverse;
  }
  justify-content: space-between;
`

const TeaserCard = styled.div`
  display: flex;
  max-width: 1024px;
  flex-direction: column;
  flex: 10;
  padding: 4px;
  cursor: pointer;

  & h2 {
    font-size: 2rem;
    font-weight: 100;
    line-height: 1.8rem;
    color: var(--text-default);
    margin-bottom: 4px;
    width: max-content;
  }

  & p {
    flex: 1;
    font-style: italic;
    opacity: 0.5;
    margin-bottom: 16px;
  }
`

const TeaserContainer = styled.article`
  display: flex;
  justify-content: center;
  height: 7rem;
  border-radius: 2px;
  margin: 32px 32px;

  @media only screen and (max-width: 720px) {
    justify-content: left;
  }

  & h2 {
    transition: all 0.2s ease-in-out;
    &::after {
      transition: all 0.2s ease-in-out;
      background-color: var(--accent);
      display: block;
      content: '';
      height: 2px;
      width: 0;
      opacity: 0;
    }
  }

  &:hover {
    & h2::after {
      width: 100%;
      opacity: 1;
    }
    & h2 {
      color: var(--accent);
    }
  }
`

export default function Teaser({ post }) {
  const { title, slug, date, description, image, caption } = post

  return (
    <Link href={`/corpus/${slug}`} prefetch={false}>
      <TeaserContainer>
        {image ? (
          <ImageContainer>
            <TeaserImage
              className="teaserImage"
              src={`/media/${image}`}
              height={128}
              width={128}
              alt={caption}
            />
          </ImageContainer>
        ) : (
          <ImagePlaceholder className="teaserImage" />
        )}
        <TeaserCard>
          <CardTitle>
            <h2>{title}</h2>
            <SmallDate>{date}</SmallDate>
          </CardTitle>
          <Excerpt>
            <p>{description}</p>
          </Excerpt>
        </TeaserCard>
      </TeaserContainer>
    </Link>
  )
}
