import type { FastifyInstance } from 'fastify'

import { authenticateWithPassword } from './auth/authenticate-with-password'
import { createAccount } from './auth/create-account'

export async function registeredRoutes(app: FastifyInstance) {
  app.get('/docs/swagger', async (_, reply) => {
    return reply.send(app.swagger())
  })

  // auth routes
  app.register(createAccount)
  app.register(authenticateWithPassword)
}
