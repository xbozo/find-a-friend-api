import { OrgNotFoundError } from '@/services/errors/org-not-found'
import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const createPetController = async (req: FastifyRequest, reply: FastifyReply) => {
	const createPetBodySchema = z.object({
		name: z.string(),
		city: z.string(),
		ageInMonths: z.coerce.number(),
		energyLevel: z.coerce.number(),
		independencyLevel: z.coerce.number(),
		requirements: z.array(z.string()),
		orgEmail: z.string().email(),
	})

	const { ageInMonths, city, energyLevel, independencyLevel, name, orgEmail, requirements } =
		createPetBodySchema.parse(req.body)

	try {
		const createPetService = makeCreatePetService()

		await createPetService.execute({
			ageInMonths,
			city,
			energyLevel,
			independencyLevel,
			name,
			requirements,
			orgEmail,
		})
	} catch (err) {
		if (err instanceof OrgNotFoundError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	reply.status(201).send()
}
