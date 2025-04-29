import { getCookie } from '@/utils/get-cookie'

export async function fetcher<T>(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<T> {
  // 1) Grab token however you need to
  let token: string | null = null

  token = await getCookie('token')

  // 2) Build headers
  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // 3) Do the real fetch
  const response = await fetch(input, { ...init, headers })

  // 4) Parse body as JSON (or text fallback)
  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  // 5) If non‐2xx, throw so your callers can catch
  if (!response.ok) {
    throw Error()
  }

  // 6) Return only the JSON payload (T)
  return { data: data } as T
}
