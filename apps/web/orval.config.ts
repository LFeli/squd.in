import { defineConfig } from 'orval'

/**
 * Configuration for Orval API client generation.
 *
 * This config generates an API client based on the OpenAPI specification found
 * at the provided `input` URL, and it customizes the output for the API client
 * with options like the HTTP client, target file path, and custom mutator.
 *
 * @returns {object} Orval configuration object
 *
 * @example
 * // The following Orval config will generate a single API client
 * // and place it in './src/http/api.ts' based on the OpenAPI specification
 * // found at 'http://localhost:3333/docs/json'.
 *
 * for generate run `npm run orval` inside in apps/web
 */
export default defineConfig({
  api: {
    input: 'http://localhost:3333/docs/json',

    output: {
      mode: 'tags-split',
      baseUrl: 'http://localhost:3333',

      target: './src/http/api.ts',
      httpClient: 'fetch',
      client: 'fetch',

      mock: false,
      biome: true,
      clean: true,

      urlEncodeParameters: true,

      override: {
        mutator: {
          path: './src/lib/fetcher.ts',
          name: 'fetcher',
        },

        suppressReadonlyModifier: true,
      },
    },
  },
})
