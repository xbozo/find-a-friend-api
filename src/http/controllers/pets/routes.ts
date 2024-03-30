import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { registerPetController } from './register-pet-controller'

export const petsRoutes = async (app: FastifyInstance) => {
	app.post('/pets', { onRequest: [verifyJWT] }, registerPetController)
}
