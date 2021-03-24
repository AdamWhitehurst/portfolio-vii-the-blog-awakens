import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const defaultMeta = {
  title: 'Adam Whitehurst',
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
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noIndex ? 'noindex' : 'follow, index'} />
      <meta content={meta.description} name="description" />
      <link rel="canonical" href={`${siteRoot}${router.asPath}`} />
      <meta property="og:url" content={`${siteRoot}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Adam Whitehurst" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      {meta.image ? (
        <meta property="og:image" content={`${siteRoot}/media/${meta.image}`} />
      ) : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@brighthurst" />
      <meta name="twitter:creator" content="@brighthurst" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.image ? (
        <meta name="twitter:image" content={`${siteRoot}/media/${meta.image}`} />
      ) : null}
      {meta.date ? (
        <meta property="article:published_time" content={meta.date} />
      ) : null}
    </Head>
  )
}
