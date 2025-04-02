export function getInitials(value: string) {
  const initials = value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}
