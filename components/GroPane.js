import styled from 'styled-components'

export default styled.div`
  overflow: hidden;
  transition: height 0.25s;
  display: flex;
  flex-direction: column;
  height: ${({ expand, height = '132px' }) => (expand ? height : '30px')};
  ${({ expand }) =>
    expand &&
    `& button {
          padding-left: 0;
        }`}
`
