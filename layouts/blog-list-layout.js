import SEO from '@components/SEO'
import TopBtnLayout from '@layouts/top-btn'

export default function BlogListLayout(props) {
  const { children } = props

  return (
    <TopBtnLayout>
      <SEO customMeta={{ title: 'Blog Posts | Adam Whitehurst' }} />
      {children}
    </TopBtnLayout>
  )
}
