import Btn from '@components/Btn'
import Draggable from 'react-draggable'
import styled from 'styled-components'

const CloseBtn = styled(Btn)`
  position: absolute;
  right: 7px;
  top: 5px;
  z-index: 100;
`
const ModalTitle = styled.label`
  display: block;
  font-weight: 500;
  font-size: 1.2rem;
  cursor: grab;
  width: 100%;
  text-align: center;
  &:hover {
    opacity: 0.5;
  }
`

const CloseIcon = () => (
  <span role="img" aria-label="close">
    ✖
  </span>
)

const ModalPanel = styled.div`
  position: absolute;
  margin: auto;
  top: 50%;
  left: 20%;
  right: 20%;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '512px')};
  background-color: var(--base);
  z-index: 10;
  padding: 16px;
  padding-top: 8px;
  box-shadow: 0px 1px 3px 1px #000;
`

const DraggableModalPanel = ({
  onPanelClose,
  children,
  handle = 'label',
  title,
  ...otherProps
}) => (
  <Draggable handle={handle}>
    <ModalPanel {...otherProps}>
      {title ? <ModalTitle>{title}</ModalTitle> : null}
      {onPanelClose ? (
        <CloseBtn onClick={onPanelClose}>
          <CloseIcon />
        </CloseBtn>
      ) : null}
      {children}
    </ModalPanel>
  </Draggable>
)

export default DraggableModalPanel
