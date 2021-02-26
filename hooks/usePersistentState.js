import React from 'react'

export default function usePersistentState(key, defaultValue) {
  if (typeof key !== 'string') {
    throw new Error(`\`key\` must be a string, recieved${typeof key}`)
  }
  // if (defaultValue === undefined) {
  //   throw new Error('`defaultValue` must be defined')
  // }

  const [value, setValue] = React.useState(() => {
    const persistedValue =
      typeof window !== 'undefined' && window.localStorage.getItem(key)

    return persistedValue !== null ? JSON.parse(persistedValue) : defaultValue
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
