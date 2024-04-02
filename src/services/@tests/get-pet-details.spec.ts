import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { GetPetDetailsService } from '../get-pet-details'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetDetailsService

describe('Get pet details service', () => {
	beforeEach(async () => {
		petsRepository = new InMemoryPetsRepository()
		orgsRepository = new InMemoryOrgsRepository()
		sut = new GetPetDetailsService(petsRepository)

		await orgsRepository.create({
			name: 'Example Org',
			email: 'contact@example.com',
			password_hash: await hash('123456', 6),
			address: 'Example Org Address',
			phone_number: '12000000000',
			id: 'new-org-id',
		})
	})

	it('should be able to get pet details', async () => {
		const createdPet = await petsRepository.create({
			age_in_months: 38,
			city: 'Example City',
			energy_level: 2,
			independency_level: 3,
			name: 'Example Pet',
			animal: 'Cachorro',
			animal_size: 2,
			requirements: ['Example Requirement 1', 'Example Requirement 2'],
			org_id: 'new-org-id',
		})

		const { pet } = await sut.execute({
			petId: createdPet.id,
		})

		expect(pet.id).toBeTypeOf('string')
		expect(pet.org_id).toBeTypeOf('string')
	})

	it('should not be able to get pet details with wrong id', async () => {
		expect(async () => {
			await sut.execute({
				petId: 'non-existing-id',
			})
		}).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
