import Code from '@components/CodeBlock'
import CodeSandbox from '@components/CodeSandbox'
import Image from '@components/ImageWithPlaceholder'
import NextLink from 'next/link'

function Link(props) {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a {...props} />
      </NextLink>
    )
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function CustomImage(props) {
  if (props.src.includes('./')) {
    return (
      <Image
        src={`/media/${props.src.replace('./', '')}`}
        height={600}
        width={800}
        alt={props.alt}
        className="object-contain"
      />
    )
  }

  return <img alt="" {...props} />
}

const mdxComponents = {
  Image,
  img: CustomImage,
  a: Link,
  CodeSandbox,
  code: Code,
}

export default mdxComponents