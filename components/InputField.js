import styled from 'styled-components'

export default styled.input.attrs((props) => ({
  className: 'inputField',
  type: props.type || 'text'
}))`
  border: none;
  border-radius: 1px;
  color: var(--text-default);
  margin-right: 3px;
  /* width: 100%; */
  flex: 1;
  background-color: var(--input-bg);
  padding-left: 4px;
  line-height: 0.5;
  font-weight: 300;
  font-style: italic;
  font-size: 0.75rem;

  &::placeholder {
    opacity: 1;
    font-style: italic;
    font-weight: 600;
  }
`
