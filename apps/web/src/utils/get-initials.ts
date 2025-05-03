/**
 * Extracts and returns the initials from a given string.
 *
 * The function splits the input string by spaces, takes the first character
 * of each word, converts it to uppercase, and returns up to the first two initials.
 *
 * @param {string} value - The input string from which to extract initials.
 * @returns {string} A string containing up to the first two uppercase initials.
 *
 * @example
 * getInitials("John Doe"); // Returns "JD"
 * getInitials("alice");    // Returns "A"
 * getInitials("Mary Jane Watson"); // Returns "MJ"
 */
export function getInitials(value: string) {
  const initials = value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}
