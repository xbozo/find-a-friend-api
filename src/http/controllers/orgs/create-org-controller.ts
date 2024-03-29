import { EmailAlreadyExistsError } from '@/services/errors/email-already-exists-error'
import { makeCreateOrgService } from '@/services/factories/make-create-org-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const createOrgController = async (req: FastifyRequest, reply: FastifyReply) => {
	const createOrgBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
		address: z.string(),
		phoneNumber: z.string(),
	})

	const { address, email, name, password, phoneNumber } = createOrgBodySchema.parse(req.body)

	try {
		const createOrgService = makeCreateOrgService()

		await createOrgService.execute({
			address,
			email,
			name,
			password,
			phoneNumber,
		})
	} catch (err) {
		if (err instanceof EmailAlreadyExistsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	reply.status(201).send()
}
