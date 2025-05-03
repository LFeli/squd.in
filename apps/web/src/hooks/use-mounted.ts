import React from 'react'

/**
 * Custom React hook that returns a boolean indicating whether the component has mounted.
 *
 * Useful for avoiding hydration mismatches in SSR (server-side rendering) environments,
 * or for running code only after the component is on the client.
 *
 * @returns {boolean} - `true` if the component has mounted, otherwise `false`.
 */
export function useMounted() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
