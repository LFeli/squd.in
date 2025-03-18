import type { FastifyInstance } from 'fastify'

import { authenticateWithGithub } from './auth/authenticate-with-github'
import { authenticateWithPassword } from './auth/authenticate-with-password'
import { createAccount } from './auth/create-account'
import { getProfile } from './auth/get-profile'
import { requestPasswordRecover } from './auth/request-password-recover'
import { resetPassword } from './auth/reset-password'
import { getOrganizationMembers } from './members/get-organization-members'
import { createOrganization } from './orgs/create-organization'
import { getMembership } from './orgs/get-membership'
import { getOrganizationDetails } from './orgs/get-organization-details'
import { getOrganizations } from './orgs/get-organizations'
import { shutdownOrganization } from './orgs/shutdown-organization'
import { transferOrganization } from './orgs/transfer-organization'
import { updateOrganization } from './orgs/update-organization'
import { createProject } from './projects/create-project'
import { deleteProject } from './projects/delete-project'
import { getProjectDetails } from './projects/get-project-details'
import { getProjects } from './projects/get-projects'
import { updateProject } from './projects/update-project'

export async function registeredRoutes(app: FastifyInstance) {
  app.get('/docs/swagger', async (_, reply) => {
    return reply.send(app.swagger())
  })

  // auth routes
  app.register(createAccount)
  app.register(authenticateWithPassword)
  app.register(authenticateWithGithub)
  app.register(requestPasswordRecover)
  app.register(resetPassword)
  app.register(getProfile)

  // organization routes
  app.register(getMembership)
  app.register(getOrganizationDetails)
  app.register(getOrganizations)
  app.register(createOrganization)
  app.register(updateOrganization)
  app.register(shutdownOrganization)
  app.register(transferOrganization)

  // project routes
  app.register(getProjectDetails)
  app.register(getProjects)
  app.register(createProject)
  app.register(updateProject)
  app.register(deleteProject)

  // members routes
  app.register(getOrganizationMembers)
}
