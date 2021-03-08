import styled from 'styled-components'

export default styled.button`
  justify-self: left;
  color: var(--text-default);
  font-weight: 200;
  font-style: italic;
  background: none;
  border: none;
  border-radius: 1px;
  white-space: nowrap;
  width: fit-content;
  padding: 0.25rem;
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
