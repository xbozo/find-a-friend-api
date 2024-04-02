import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getPetDetailsController } from './get-pet-details-controller'
import { registerPetController } from './register-pet-controller'

export const petsRoutes = async (app: FastifyInstance) => {
	app.get('/pets/:petId', getPetDetailsController)

	app.post('/pets', { onRequest: [verifyJWT] }, registerPetController)
}
