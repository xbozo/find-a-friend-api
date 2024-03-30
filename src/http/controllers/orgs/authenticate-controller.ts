import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const authenticateController = async (req: FastifyRequest, reply: FastifyReply) => {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { email, password } = authenticateBodySchema.parse(req.body)

	try {
		const authenticateService = makeAuthenticateService()

		const { org } = await authenticateService.execute({
			email,
			password,
		})

		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: org.email, // subject
				},
			}
		)

		const refreshToken = await reply.jwtSign(
			{},
			{
				sign: {
					sub: org.email,
					expiresIn: '7d',
				},
			}
		)

		reply
			.status(200)
			.setCookie('refreshToken', refreshToken, {
				path: '/', // all
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.send({
				token,
			})
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: err.message })
		}

		throw err
	}
}
