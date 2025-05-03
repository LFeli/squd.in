import { QueryClient } from '@tanstack/react-query'

/**
 * A instance of QueryClient used for managing server state caching,
 * background updates, and request deduplication throughout the application.
 *
 * Provided by `@tanstack/react-query`.
 */
export const queryClient = new QueryClient()
