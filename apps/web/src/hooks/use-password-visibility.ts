import React from 'react'

/**
 * Custom React hook to manage the visibility state of a password input field.
 *
 * Provides a boolean flag to indicate whether the password is visible,
 * and a function to toggle the visibility state.
 *
 * @returns {{ isVisible: boolean, toggleVisibility: () => void }} -
 * An object containing the current visibility state and a function to toggle it.
 */
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
