import fastifyCors from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from '@squd-in/env'
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
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: env.FRONT_END_URL,
})

// generate swagger docs and ui
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'squd_in',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '0.0.1',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },

  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

registeredRoutes(app)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server is running... 🚀')
})
