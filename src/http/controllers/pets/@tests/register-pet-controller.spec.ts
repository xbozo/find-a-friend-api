import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register pet controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to register a pet', async () => {
		const { token } = await createAndAuthenticateOrg(app)

		const response = await request(app.server)
			.post(`/pets`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				ageInMonths: 38,
				city: 'Example City',
				energyLevel: 2,
				independencyLevel: 3,
				name: 'Example Pet',
				animal: 'Cachorro',
				animalSize: 2,
				requirements: ['Example Requirement 1', 'Example Requirement 2'],
			})

		expect(response.statusCode).toEqual(201)
	})
})
