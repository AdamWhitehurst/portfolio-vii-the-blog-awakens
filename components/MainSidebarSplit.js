import styled from 'styled-components'

export default styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media only screen and (min-width: 815px) {
    grid-template-columns: 175px 10fr;
  }
  grid-gap: 0.5rem;
`
