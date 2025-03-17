export function createSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\p{M}]/gu, '')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}
