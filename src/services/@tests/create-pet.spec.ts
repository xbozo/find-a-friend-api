import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetService } from '../create-pet'
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetService

describe('Create org service', () => {
	beforeEach(async () => {
		petsRepository = new InMemoryPetsRepository()
		orgsRepository = new InMemoryOrgsRepository()
		sut = new CreatePetService(petsRepository, orgsRepository)
	})

	it('should be able to create new pet', async () => {
		const { pet } = await sut.execute({
			age: 5,
			city: 'Example City',
			energy_level: 2,
			independency_level: 3,
			name: 'Example Pet',
			org_email: 'contact@example.com',
			requirements: ['Example Requirement 1', 'Example Requirement 2'],
		})

		expect(org.id).toBeTypeOf('string')
	})

	it('should hash org password upon registration', async () => {
		const { org } = await sut.execute({
			name: 'Example Org',
			address: 'Example Org Address',
			email: 'nqLpN@example.com',
			phoneNumber: '12000000000',
			password: '123456',
		})

		const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with existing email', async () => {
		await sut.execute({
			name: 'Example Org',
			address: 'Example Org Address',
			email: 'nqLpN@example.com',
			phoneNumber: '12000000000',
			password: '123456',
		})

		expect(async () => {
			await sut.execute({
				name: 'Example Org',
				address: 'Example Org Address',
				email: 'nqLpN@example.com',
				phoneNumber: '12000000000',
				password: '123456',
			})
		}).rejects.toBeInstanceOf(EmailAlreadyExistsError)
	})
})
