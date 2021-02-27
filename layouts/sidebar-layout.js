import BigLabel from '@components/BigLabel'
import GroBtn from '@components/GroBtn'
import Header from '@components/Header'
import Main from '@components/Main'
import MainSidebarSplit from '@components/MainSidebarSplit'
import PrefsPane from '@components/PrefsPane'
import Sidebar from '@components/Sidebar'
import BaseLayout from '@layouts/base-layout'

export default function SidebarLayout({ children }) {
  return (
    <BaseLayout>
      <Header>
        <BigLabel>A Blog</BigLabel>
      </Header>
      <MainSidebarSplit>
        <Sidebar>
          <GroBtn>HOME</GroBtn>
          <GroBtn>BLOG</GroBtn>
          <GroBtn>ROGULEDITES</GroBtn>
          <PrefsPane />
        </Sidebar>
        <Main>{children}</Main>
      </MainSidebarSplit>
    </BaseLayout>
  )
}
