import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh token controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to refresh a token', async () => {
		await request(app.server).post('/orgs').send({
			name: 'Organização Amigo Feliz',
			email: 'contact@amigofeliz.com.br',
			password: '123456',
			address: 'Rua Maria das Raposas N° 80, Teresina/SP',
			phoneNumber: '12997931931',
		})

		const authResponse = await request(app.server).post('/sessions').send({
			email: 'contact@amigofeliz.com.br',
			password: '123456',
		})

		const cookies = authResponse.get('Set-Cookie')

		const response = await request(app.server)
			.patch('/token/refresh')
			.set('Cookie', cookies!)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.token).toBeTypeOf('string')
		expect(response.get('Set-Cookie')).toEqual([expect.stringContaining('refreshToken=')])
	})
})
