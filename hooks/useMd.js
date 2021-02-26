// import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor'
// import markdownItMermaid from '@liradb2000/markdown-it-mermaid'
// import { toIdTitle } from '@utils'
// import DOMPurify from 'dompurify'
// import hljs from 'highlight.js'
// import MarkdownIt from 'markdown-it'
// import calendar from 'markdown-it-calendar'
// import container from 'markdown-it-container'
// import wikilinks from 'markdown-it-wikilinks'
// import { ToastsStore } from 'react-toasts'
//
// export function useMd() {
//   return new MarkdownIt({
//     linkify: true,
//     html: true,
//     breaks: true,
//     highlight(str, lang) {
//       if (lang && hljs.getLanguage(lang)) {
//         try {
//           return hljs.highlight(lang, str).value
//         } catch (e) {
//           ToastsStore.error(e)
//         }
//       }
//
//       return '' // use external default escaping
//     },
//   })
//     .use(wikilinks({
//       uriSuffix: '',
//       relativeBaseURL: '/blog/',
//       generatePageNameFromLabel: toIdTitle,
//     }))
//     .use(markdownItMermaid)
//     // .use(markdownItTocAndAnchor, {
//     //   anchorLinkSymbol: '',
//     //   wrapHeadingTextInAnchor: true,
//     // })
//     .use(calendar)
//     .use(container, 'spoiler', {
//
//       validate(params) {
//         return params.trim().match(/^spoiler\s+(.*)$/)
//       },
//
//       render(tokens, idx) {
//         const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)
//
//         if (tokens[idx].nesting === 1) {
//           // opening tag
//           return `<details><summary>${DOMPurify.sanitize(m[1])}</summary>\n`
//         }
//         // closing tag
//         return '</details>\n'
//       },
//     })
// }
