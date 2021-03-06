import SEO from '@components/SEO'
import SidebarLayout from '@layouts/sidebar-layout'

export default function BlogListLayout(props) {
  const { children } = props

  return (
    <SidebarLayout>
      <SEO customMeta={{ title: 'Blog Posts | Adam Whitehurst' }} />
      {children}
    </SidebarLayout>
  )
}
