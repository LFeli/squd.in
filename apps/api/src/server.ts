import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

// fastify app instance + type provider of zod
const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
})

// generate swagger docs and ui
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'reffer.al',
      version: '0.0.1',
    },
  },

  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server is running... 🚀')
})
