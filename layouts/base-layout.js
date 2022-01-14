import styled from 'styled-components'
const BaseCntnr = styled.div`
  margin: auto;
  max-width: 1280px;
`
export default function BaseLayout({ children }) {
  return <BaseCntnr id="base-layout-container">{children}</BaseCntnr>
}
