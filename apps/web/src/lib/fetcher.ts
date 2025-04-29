import { getCookie } from '@/utils/get-cookie'

/**
 * Custom fetcher function for Orval to perform authenticated API requests.
 *
 * Automatically attaches a Bearer token from cookies if available,
 * sets the 'Content-Type' header to 'application/json',
 * and parses the response as JSON or text fallback.
 *
 * @template T - Expected type of the response data.
 * @param {RequestInfo} input - URL or Request object.
 * @param {RequestInit} [init={}] - Optional fetch configuration.
 * @returns {Promise<{ data: T }>} A Promise resolving to an object containing the parsed response data.
 *
 */
export async function fetcher<T>(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<{ data: T }> {
  const token = await getCookie('token')

  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(input, { ...init, headers })

  const contentType = response.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    throw new Error()
  }

  return { data: data as T }
}
