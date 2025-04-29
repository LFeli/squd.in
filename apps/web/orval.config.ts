import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: 'http://localhost:3333/docs/json',

    output: {
      mode: 'single',
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
