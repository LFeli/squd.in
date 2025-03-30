import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: 'http://localhost:3333/docs/json',

    output: {
      target: './src/http/api.ts',

      baseUrl: 'http://localhost:3333',
      client: 'fetch',
      httpClient: 'fetch',
      clean: true,

      override: {
        fetch: {
          includeHttpResponseReturnType: true,
        },
      },
    },
  },
})
