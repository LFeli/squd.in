import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to conditionally join class names and intelligently merge Tailwind CSS classes.
 *
 * Uses `clsx` to combine class values and `tailwind-merge` to resolve class conflicts
 * (e.g., `p-2` and `p-4` would result in `p-4`).
 *
 * @param {...ClassValue[]} inputs - A list of class values (strings, objects, arrays, etc.)
 * @returns {string} - A single merged class string with conflicts resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
