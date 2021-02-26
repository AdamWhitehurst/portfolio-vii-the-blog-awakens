import styled from 'styled-components'

export default styled.header`
  display: flex;
  flex-direction: row;
  ${({ reverse }) => (reverse ? 'flex-direction: row-reverse;' : null)}
  align-items: flex-end;
  min-height: 60px;
  padding-bottom: 1.25rem;
`
