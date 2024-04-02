import { makeRegisterPetService } from '@/services/factories/make-register-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const registerPetController = async (req: FastifyRequest, reply: FastifyReply) => {
	const registerPetBodySchema = z.object({
		name: z.string(),
		city: z.string(),
		ageInMonths: z.coerce.number(),
		animalSize: z.coerce.number(),
		animal: z.string(),
		energyLevel: z.coerce.number().min(1).max(5),
		independencyLevel: z.coerce.number().min(1).max(5),
		requirements: z.array(z.string()),
	})

	const {
		ageInMonths,
		city,
		energyLevel,
		independencyLevel,
		name,
		requirements,
		animal,
		animalSize,
	} = registerPetBodySchema.parse(req.body)

	const registerPetService = makeRegisterPetService()

	const orgId = req.user.sub

	await registerPetService.execute({
		ageInMonths,
		city,
		energyLevel,
		independencyLevel,
		name,
		requirements,
		animal,
		animalSize,
		orgId,
	})

	reply.status(201).send()
}
