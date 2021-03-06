import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const defaultMeta = {
  title: 'Adam Whithurst',
  description: 'Full stack software engineer',
  type: 'website',
  image: 'this_guy.jpg'
}
const siteRoot = 'https://adamwhitehur.st'

export default function SEO({ customMeta, noIndex }) {
  const router = useRouter()
  const meta = {
    ...defaultMeta,
    ...customMeta
  }

  return (
    <Head>
      <title>{meta.title}</title>
      <meta
        name="robots"
        content={noIndex ? 'noindex' : 'follow, index'}
      />
      <meta
        content={meta.description}
        name="description"
      />
      <meta
        property="og:url"
        content={`${siteRoot}${router.asPath}`}
      />
      <link
        rel="canonical"
        href={`${siteRoot}${router.asPath}`}
      />
      <meta
        property="og:type"
        content={meta.type}
      />
      <meta
        property="og:site_name"
        content="Adam Whitehurst"
      />
      <meta
        property="og:description"
        content={meta.description}
      />
      <meta
        property="og:title"
        content={meta.title}
      />
      <meta
        property="og:image"
        content={`${siteRoot}/media/${meta.image}`}
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:site"
        content="@brighthurst"
      />
      <meta
        name="twitter:title"
        content={meta.title}
      />
      <meta
        name="twitter:description"
        content={meta.description}
      />
      <meta
        name="twitter:image"
        content={`${siteRoot}/media/${meta.image}`}
      />
      {meta.date ? 
        <meta
          property="article:published_time"
          content={meta.date}
        /> : null}
    </Head>
  )
}
