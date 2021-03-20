import React, { useEffect, useRef, useCallback } from 'react'

export function getInitials(name) {
  let initials = name.match(/\b\w/g) || []
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  return initials
}

export const useClickOutside = (fn) => {
  const ref = useRef(null)

  const handleClick = useCallback(
    (e) => {
      if (ref && ref.current && !ref.current.contains(e.target)) {
        fn() // inside the element
      }
    },
    [ref, fn]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [handleClick])

  return ref
}
export const useKeypress = (key, action) => {
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === key) action()
    }
    window.addEventListener('keyup', onKeyup)
    return () => window.removeEventListener('keyup', onKeyup)
  }, [])
}
