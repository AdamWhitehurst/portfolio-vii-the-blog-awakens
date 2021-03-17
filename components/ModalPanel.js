import styled from 'styled-components'

const ModalPanel = styled.div`
  position: absolute;
  margin: auto;
  top: 50%;
  left: 20%;
  right: 20%;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '512px')};
  background-color: var(--base);
  z-index: 10;
  padding: 1rem;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.75);
`

export default ModalPanel
