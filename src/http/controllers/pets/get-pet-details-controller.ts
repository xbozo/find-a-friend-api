import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeGetPetDetailsService } from '@/services/factories/make-get-pet-details-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getPetDetailsController = async (req: FastifyRequest, reply: FastifyReply) => {
	const getPetDetailsParamsSchema = z.object({
		petId: z.string().uuid(),
	})

	const { petId } = getPetDetailsParamsSchema.parse(req.params)

	try {
		const getPetDetailsService = makeGetPetDetailsService()

		const { pet } = await getPetDetailsService.execute({
			petId,
		})

		reply.status(200).send({
			pet,
		})
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: err.message })
		}

		throw err
	}
}
