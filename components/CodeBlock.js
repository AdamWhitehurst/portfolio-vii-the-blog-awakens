import Highlight, { defaultProps } from 'prism-react-renderer'
import dracula from 'prism-react-renderer/themes/dracula'
import React from 'react'

const highlightColorCodes = [
  '// highlight-line-one',
  '// highlight-line-two',
  '// highlight-line-three'
]

const getHighlightedLine = (line, marks = highlightColorCodes) => {
  let finalMark = false
  const s = line?.some((prevLine) =>
    marks.some((mark) => {
      let lineHasHighlight = prevLine?.content.includes(mark)
      if (lineHasHighlight) finalMark = mark
      return lineHasHighlight
    })
  )
  return finalMark || s
}

export default function Code({ children, className }) {
  const language = className?.replace(/language-/, '')
  return (
    <Highlight {...defaultProps} theme={dracula} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return tokens.length === 1 ? (
          <code style={{ ...style, marginRight: '2px', padding: '0 3px' }}>
            {tokens[0][0].content}
          </code>
        ) : (
          <pre className={`${className}`} style={{ backgroundColor: '#121212' }}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })
              const classNameArr = [lineProps.className]
              if (getHighlightedLine(line)) return null
              const previousHighlight = getHighlightedLine(tokens?.[i - 1])
              if (previousHighlight) classNameArr.push(previousHighlight)

              const finalLineProps = {
                ...lineProps,
                className: classNameArr.join(' ')
              }
              return (
                <div key={i} {...finalLineProps}>
                  {line.map((token, key) => {
                    return <span key={key} {...getTokenProps({ token, key })} />
                  })}
                </div>
              )
            })}
          </pre>
        )
      }}
    </Highlight>
  )
}
