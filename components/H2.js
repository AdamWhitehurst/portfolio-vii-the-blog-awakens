import styled from 'styled-components'

export default styled.h2`
  color: var(--text-default);
  font-weight: 200;
  font-style: italic;
  background: none;
  border: none;
  border-radius: 1px;
  white-space: nowrap;
  font-size: 1.2rem;
  line-height: 1.4rem;

  &:hover {
    color: var(--accent);
  }
  &[disabled],
  &:disabled {
    cursor: unset;
    opacity: 1;
    &:hover {
      color: var(--text-default);
    }
  }
`
