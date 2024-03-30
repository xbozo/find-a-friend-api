import { prisma } from '@/libs/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const createAndAuthenticateOrg = async (app: FastifyInstance) => {
	await prisma.org.create({
		data: {
			name: 'Organização Happy Pet',
			email: 'contact@happypet.com',
			password_hash: await hash('123456', 6),
			address: 'Rua Maria das Raposas N° 80, Teresina/SP',
			phone_number: '12000000000',
		},
	})

	const authResponse = await request(app.server).post('/sessions').send({
		email: 'contact@happypet.com',
		password: '123456',
	})

	const { token } = authResponse.body

	return { token }
}
