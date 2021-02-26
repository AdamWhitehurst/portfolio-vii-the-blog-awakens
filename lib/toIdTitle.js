import { emojis, punctuation } from '@lib/regex'

const toIdTitle = (title, id) =>
  `${title
    .replace(punctuation, '')
    .replace(emojis, ' ')
    .trim()
    .toLowerCase()
    .split(' ')
    .join('_')}`.concat(id ? `_${id}` : '')

export default toIdTitle
