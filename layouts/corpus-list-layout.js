import SEO from '@components/SEO'
import TopBtnLayout from '@layouts/top-btn'

export default function CorpusListLayout(props) {
  const { children } = props

  return (
    <TopBtnLayout>
      <SEO customMeta={{ title: 'Posts | Adam Whitehurst' }} />
      {children}
    </TopBtnLayout>
  )
}
