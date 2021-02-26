import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: row;
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent};` : null}
  ${({ reverse }) =>
    reverse ? 'flex-direction: row-reverse;' : null}
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
`
