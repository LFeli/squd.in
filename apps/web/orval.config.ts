import { env } from '@squd-in/env'
import { defineConfig } from 'orval'

const API_URL = env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'

const API_INPUT = `${API_URL}/docs/json`

export default defineConfig({
  api: {
    input: API_INPUT,

    output: {
      mode: 'single',
      baseUrl: API_URL,

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
