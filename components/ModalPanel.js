import Btn from '@components/Btn'
import Draggable from 'react-draggable'
import styled from 'styled-components'

const CloseBtn = styled(Btn)`
  position: absolute;
  right: 7px;
  top: 0;
  z-index: 100;
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
  padding: 1rem;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.75);
`

const DraggableModalPanel = ({ onPanelClose, children, ...otherProps }) => (
  <Draggable>
    <ModalPanel {...otherProps}>
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
