import fastifyCors from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { errorHandler } from './http/error-handler'
import { registeredRoutes } from './http/routes/registered-routes'

// fastify app instance + type provider of zod
const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifyJwt, {
  secret: 'my-super-secret-key',
})

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
})

// generate swagger docs and ui
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'squd_in',
      version: '0.0.1',
    },
  },

  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

registeredRoutes(app)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server is running... 🚀')
})
