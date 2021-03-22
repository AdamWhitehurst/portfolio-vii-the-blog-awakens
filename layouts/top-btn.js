import BigLabel from '@components/BigLabel'
import BtnBar from '@components/BtnBar'
import BtnWrapper from '@components/BtnWrapper'
import GroBtn from '@components/GroBtn'
import Header from '@components/Header'
import Main from '@components/Main'
import PrefsPane from '@components/PrefsPane'
import BaseLayout from '@layouts/base-layout'
import Link from 'next/link'

export default function TopBtnLayout({ children }) {
  return (
    <BaseLayout>
      <Header>
        <BigLabel>Adam Whitehurst</BigLabel>
      </Header>
      <BtnBar>
        <BtnWrapper>
          <Link href="/">
            <GroBtn>HOME</GroBtn>
          </Link>
        </BtnWrapper>
        <BtnWrapper>
          <Link href="/corpus">
            <GroBtn>CORPUS</GroBtn>
          </Link>
        </BtnWrapper>
        <BtnWrapper>
          <Link href="/roguie">
            <GroBtn>ROGULEDITES</GroBtn>
          </Link>
        </BtnWrapper>
        <BtnWrapper>
          <PrefsPane />
        </BtnWrapper>
      </BtnBar>
      <br />
      <br />
      <br />
      <Main>{children}</Main>
    </BaseLayout>
  )
}
