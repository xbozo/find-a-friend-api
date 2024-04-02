import { app } from '@/app'
import { prisma } from '@/libs/prisma'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get pet details controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get pet details', async () => {
		const { token } = await createAndAuthenticateOrg(app)

		await request(app.server)
			.post(`/pets`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Example Pet 1',
				city: 'Example City',
				ageInMonths: 50,
				energyLevel: 1,
				independencyLevel: 1,
				animalSize: 1,
				animal: 'Cachorro',
				requirements: ['Example Requirement 1', 'Example Requirement 2'],
			})

		const pet = await prisma.pet.findFirst({
			where: {
				name: 'Example Pet 1',
			},
		})

		const response = await request(app.server).get(`/pets/${pet!.id}`)

		expect(response.statusCode).toEqual(200)
		expect(response.body.pet).toEqual(
			expect.objectContaining({
				name: 'Example Pet 1',
				animal: 'Cachorro',
				animal_size: 1,
				energy_level: 1,
				independency_level: 1,
				age_in_months: 50,
			})
		)
	})
})
