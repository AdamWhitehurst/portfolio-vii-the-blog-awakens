import BigLabel from '@components/BigLabel'
import GroBtn from '@components/GroBtn'
import Header from '@components/Header'
import Main from '@components/Main'
import PrefsPane from '@components/PrefsPane'
import BaseLayout from '@layouts/base-layout'
import Link from 'next/link'
import styled from 'styled-components'

const BtnWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow: visible;
`

const TopBtnBar = styled.div`
  display: flex;
  justify-content: space-around;
`

export default function TopBtnLayout({ children }) {
  return (
    <BaseLayout>
      <Header>
        <BigLabel>Adam Whitehurst</BigLabel>
      </Header>
      <TopBtnBar>
        <BtnWrapper>
          <Link href="/">
            <GroBtn>HOME</GroBtn>
          </Link>
        </BtnWrapper>
        <BtnWrapper>
          <Link href="/blog">
            <GroBtn>BLOG</GroBtn>
          </Link>
        </BtnWrapper>
        <BtnWrapper>
          <GroBtn>ROGULEDITES</GroBtn>
        </BtnWrapper>
        <BtnWrapper>
          <PrefsPane />
        </BtnWrapper>
      </TopBtnBar>
      <Main>{children}</Main>
    </BaseLayout>
  )
}
