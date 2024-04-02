import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch pets controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()

		const { token } = await createAndAuthenticateOrg(app)

		await request(app.server)
			.post(`/pets`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				ageInMonths: 38,
				city: 'Example City',
				energyLevel: 2,
				independencyLevel: 3,
				name: 'Example Pet 1',
				animal: 'Cachorro',
				animalSize: 2,
				requirements: ['Example Requirement 1', 'Example Requirement 2'],
			})

		await request(app.server)
			.post(`/pets`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				ageInMonths: 50,
				city: 'Example City',
				energyLevel: 1,
				independencyLevel: 1,
				name: 'Example Pet 2',
				animal: 'Gato',
				animalSize: 1,
				requirements: ['Example Requirement 1', 'Example Requirement 2'],
			})
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to fetch pets', async () => {
		const response = await request(app.server).get(`/pets`).query({
			city: 'Example City',
		})

		expect(response.statusCode).toEqual(200)
		expect(response.body.pets).toHaveLength(2)
	})

	it('should be able to fetch pets with filters', async () => {
		const response = await request(app.server).get(`/pets`).query({
			city: 'Example City',
			ageInMonths: 50,
			energyLevel: 1,
			independencyLevel: 1,
			animalSize: 1,
			animal: 'Gato',
		})

		expect(response.statusCode).toEqual(200)
		expect(response.body.pets).toEqual([
			expect.objectContaining({
				name: 'Example Pet 2',
				animal: 'Gato',
				animal_size: 1,
				energy_level: 1,
				independency_level: 1,
				age_in_months: 50,
			}),
		])
	})
})
