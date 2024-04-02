import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate as org controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to authenticate', async () => {
		await request(app.server).post('/orgs').send({
			name: 'Organização Amigo Feliz',
			email: 'contact@amigofeliz.com.br',
			password: '123456',
			address: 'Rua Maria das Raposas N° 80, Teresina/SP',
			phoneNumber: '12997931931',
		})

		const response = await request(app.server).post('/sessions').send({
			email: 'contact@amigofeliz.com.br',
			password: '123456',
		})

		expect(response.statusCode).toEqual(200)
	})
})
