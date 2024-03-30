import { FastifyInstance } from 'fastify'
import { authenticateController } from './authenticate-controller'
import { createOrgController } from './create-org-controller'

export const orgsRoutes = async (app: FastifyInstance) => {
	app.post('/orgs', createOrgController)
	app.post('/sessions', authenticateController)
}
