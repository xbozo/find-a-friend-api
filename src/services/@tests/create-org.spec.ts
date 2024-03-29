import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgService } from '../create-org'
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgService

describe('Create org service', () => {
	beforeEach(async () => {
		orgsRepository = new InMemoryOrgsRepository()
		sut = new CreateOrgService(orgsRepository)
	})

	it('should be able to create new org', async () => {
		const { org } = await sut.execute({
			name: 'Example Org',
			address: 'Example Org Address',
			email: 'nqLpN@example.com',
			phoneNumber: '12000000000',
			password: '123456',
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
