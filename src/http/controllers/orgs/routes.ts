import { FastifyInstance } from 'fastify'
import { createOrgController } from './create-org-controller'

export const orgsRoutes = async (app: FastifyInstance) => {
	app.post('/orgs', createOrgController)
}
