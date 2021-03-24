import styled from 'styled-components'

const PreviewContainer = styled.div`
  flex: 1;
  border-radius: 1px;
  padding: 8px 24px;
  overflow: auto;
  line-height: 1.5rem;
  vertical-align: bottom;
  letter-spacing: 0.01rem;
  max-width: 1024px;
  color: var(--text-default);

  & p,
  & ul,
  & ol {
    margin: 16px 0;
  }

  & ol,
  & ul {
    margin-left: 32px;
    padding: 16px;
  }

  & code {
    background-color: #00000033;
    border-radius: 2px;
    padding: 2.5px;
    font-size: 1.1rem;
  }

  & pre {
    overflow: auto;
  }

  & p > img,
  & pre {
    code {
      background-color: unset;
    }

    font-family: monospace;
    border-radius: 2px;
    padding: 4px;
    background-color: #00000033;
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    margin-top: 16px;
    margin-bottom: 16px;
    font-weight: normal;
    line-height: 1.8rem;
  }

  & .markdown-it-calendar {
    overflow-x: auto;

    & table tbody {
      border: none !important;
    }
  }

  .markdown-it-calendar > .calendar > tbody > tr > td {
    max-width: unset;
  }
  .markdown-it-calendar .calendar {
    width: 100%;
  }

  & .calendar {
    color: var(--text-default);

    & .calendar-week-name {
      background-color: var(--accent);
      color: var(--base);
    }

    & tbody tr:nth-child(2n) {
      background-color: var(--input-bg);
    }

    & .calendar-cell:hover {
      background-color: unset;
    }

    & .calendar-cell-title {
      background-color: unset;
      color: var(--accent);
    }

    & .calendar-content-tag {
      color: rgba(var(--text-default), 0.8);
      &::before {
        background-color: var(--accent);
        top: 10px;
        left: 2px;
      }
      &:hover {
        color: var(--accent);
      }
    }

    & .calendar-cell-date {
      left: 2px;
      height: 20px;
      width: 20px;
    }

    & td {
      min-height: 40px;
      min-width: 100px;
      vertical-align: baseline;
    }
  }

  & details summary {
    /* color: var(--accent); */
    cursor: pointer;

    &::before {
      color: var(--accent);
      top: 10px;
      left: 2px;
      content: '> ';
      width: 6px;
      height: 6px;
    }
  }

  & details[open] summary {
    color: var(--text-default);
    &::before {
      content: '^ ';
    }
  }

  & blockquote {
    padding-left: 32px;
    border-left: 2px solid var(--accent);
  }
`

export default PreviewContainer
