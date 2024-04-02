import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeFetchPetsService } from '@/services/factories/make-fetch-pets-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const fetchPetsController = async (req: FastifyRequest, reply: FastifyReply) => {
	const fetchPetsQuerySchema = z.object({
		city: z.string(),
		energyLevel: z.coerce.number().optional(),
		independencyLevel: z.coerce.number().optional(),
		animal: z.string().optional(),
		ageInMonths: z.coerce.number().optional(),
		animalSize: z.coerce.number().optional(),
	})

	const { city, ageInMonths, animal, animalSize, energyLevel, independencyLevel } =
		fetchPetsQuerySchema.parse(req.query)

	try {
		const fetchPetsService = makeFetchPetsService()

		const { pets } = await fetchPetsService.execute({
			city,
			ageInMonths,
			animal,
			animalSize,
			energyLevel,
			independencyLevel,
		})

		reply.status(200).send({
			pets,
		})
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: err.message })
		}

		throw err
	}
}
