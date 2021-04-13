// Inspired by https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/ and
// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state

import * as React from 'react'

export default function usePrevious<T>(value: T): null | T {
  const container = React.useRef<T>(null)
  const previousValue = container.current
  Object.assign(container, {
    current: value,
  })
  return previousValue
}
