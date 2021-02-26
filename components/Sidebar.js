import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  ${({ reverse }) => (reverse ? 'flex-direction: column-reverse;' : null)}
`
