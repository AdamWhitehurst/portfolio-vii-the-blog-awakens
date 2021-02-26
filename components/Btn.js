import styled from 'styled-components'

export default styled.button`
  justify-self: left;
  color: var(--text-default);
  font-weight: 700;
  background: none;
  border: none;
  border-radius: 1px;
  width: fit-content;
  white-space: nowrap;
  padding: 0.25rem;
  font-size: 1.2rem;
  line-height: 1.4rem;

  &:hover {
    color: var(--accent);
    opacity: 50%;
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
