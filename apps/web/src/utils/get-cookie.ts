/**
 * Retrieves the value of a cookie by its name, working both on the server (Next.js) and the client (browser).
 *
 * - On the server side, it uses `next/headers` to access cookies.
 * - On the client side, it reads from `document.cookie`.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {Promise<string | null>} The value of the cookie if found, otherwise `null`.
 *
 * @example
 * const token = await getCookie('token');
 */
export async function getCookie(name: string): Promise<string | null> {
  if (typeof window === 'undefined') {
    // —— SERVER ——
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return cookieStore.get(name)?.value ?? null
  }

  // —— CLIENT ——
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
  return match ? match.split('=')[1] : null
}
