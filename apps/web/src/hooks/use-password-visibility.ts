import React from 'react'

export function usePasswordVisibility() {
  const [isVisible, setIsVisible] = React.useState(false)

  function toggleVisibility() {
    setIsVisible(prev => !prev)
  }

  return {
    isVisible,
    toggleVisibility,
  }
}
