import styled from 'styled-components'

export default styled.header`
  display: flex;
  flex-direction: row;
  ${({ reverse }) => (reverse ? 'flex-direction: row-reverse;' : null)}
  align-items: flex-end;
  justify-content: center;
  min-height: 40px;
  margin-bottom: 0.5rem;
`
