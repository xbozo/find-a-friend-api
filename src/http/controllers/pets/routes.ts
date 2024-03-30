import { FastifyInstance } from 'fastify'
import { createPetController } from './create-pet-controller'

export const petsRoutes = async (app: FastifyInstance) => {
	app.post('/pets', createPetController)
}
