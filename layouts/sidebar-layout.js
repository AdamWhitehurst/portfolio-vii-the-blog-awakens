import BigLabel from '@components/BigLabel'
import GroBtn from '@components/GroBtn'
import Header from '@components/Header'
import Main from '@components/Main'
import MainSidebarSplit from '@components/MainSidebarSplit'
import PrefsPane from '@components/PrefsPane'
import Sidebar from '@components/Sidebar'
import BaseLayout from '@layouts/base-layout'
import Link from 'next/link'

export default function SidebarLayout({ children }) {
  return (
    <BaseLayout>
      <Header>
        <BigLabel>Adam Whitehurst</BigLabel>
      </Header>
      <MainSidebarSplit>
        <Sidebar>
          <Link href="/">
            <GroBtn>HOME</GroBtn>
          </Link>
          <Link href="/corpus">
            <GroBtn>CORPUS</GroBtn>
          </Link>
          <GroBtn>ROGULEDITES</GroBtn>
          <PrefsPane />
        </Sidebar>
        <Main>{children}</Main>
      </MainSidebarSplit>
    </BaseLayout>
  )
}
