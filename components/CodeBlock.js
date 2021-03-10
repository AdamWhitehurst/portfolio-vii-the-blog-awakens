import Highlight, { defaultProps } from 'prism-react-renderer'
import vsDark from 'prism-react-renderer/themes/vsDark'

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
    <Highlight {...defaultProps} theme={vsDark} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            className={`${className} overflow-auto w-72 sm:w-full`}
            style={{ ...style, padding: '20px' }}
          >
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
