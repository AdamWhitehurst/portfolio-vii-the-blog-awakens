import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: row;
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent};` : null}
  ${({ reverse }) =>
    reverse ? 'flex-direction: row-reverse;' : null}
  padding-bottom: 4px;
  padding-top: 4px;
`
