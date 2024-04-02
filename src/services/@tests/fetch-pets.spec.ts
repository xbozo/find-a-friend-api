import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsService } from '../fetch-pets'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchPetsService

describe('Fetch pets service', () => {
	beforeEach(async () => {
		petsRepository = new InMemoryPetsRepository()
		orgsRepository = new InMemoryOrgsRepository()
		sut = new FetchPetsService(petsRepository)

		await orgsRepository.create({
			name: 'Example Org',
			email: 'contact@example.com',
			password_hash: await hash('123456', 6),
			address: 'Example Org Address',
			phone_number: '12000000000',
			id: 'new-org-id',
		})
	})

	it('should be able to fetch pets', async () => {
		await petsRepository.create({
			age_in_months: 38,
			city: 'Example City',
			energy_level: 2,
			independency_level: 3,
			name: 'Example Pet 1',
			animal: 'Cachorro',
			animal_size: 2,
			requirements: ['Example Requirement 1', 'Example Requirement 2'],
			org_id: 'new-org-id',
		})

		await petsRepository.create({
			age_in_months: 40,
			city: 'Example City',
			energy_level: 2,
			independency_level: 3,
			name: 'Example Pet 2',
			animal: 'Cachorro',
			animal_size: 2,
			requirements: ['Example Requirement 1', 'Example Requirement 2'],
			org_id: 'new-org-id',
		})

		const { pets } = await sut.execute({
			city: 'Example City',
		})

		expect(pets).toHaveLength(2)
		expect(pets).toEqual([
			expect.objectContaining({
				name: 'Example Pet 1',
			}),
			expect.objectContaining({
				name: 'Example Pet 2',
			}),
		])
	})

	it('should be able to fetch pets with filters', async () => {
		await petsRepository.create({
			age_in_months: 38,
			city: 'Example City',
			energy_level: 2,
			independency_level: 3,
			name: 'Example Pet 1',
			animal: 'Cachorro',
			animal_size: 2,
			requirements: ['Example Requirement 1', 'Example Requirement 2'],
			org_id: 'new-org-id',
		})

		await petsRepository.create({
			age_in_months: 50,
			city: 'New York',
			energy_level: 1,
			independency_level: 1,
			name: 'Example Pet 2',
			animal: 'Gato',
			animal_size: 1,
			requirements: ['Example Requirement 1', 'Example Requirement 2'],
			org_id: 'new-org-id',
		})

		const { pets } = await sut.execute({
			city: 'New York',
			ageInMonths: 50,
			animal: 'Gato',
			animalSize: 1,
			energyLevel: 1,
			independencyLevel: 1,
		})

		expect(pets).toHaveLength(1)
		expect(pets).toEqual([
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
