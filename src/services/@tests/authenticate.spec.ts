import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateService } from '../authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateService

describe('Authenticate service', () => {
	beforeEach(async () => {
		orgsRepository = new InMemoryOrgsRepository()
		sut = new AuthenticateService(orgsRepository)
	})

	it('should be able to authenticate', async () => {
		await orgsRepository.create({
			name: 'Example org',
			email: 'exampleorg@example.com',
			password_hash: await hash('123456', 6),
			address: 'Example Org Address',
			phone_number: '12000000000',
		})

		const { org } = await sut.execute({
			email: 'exampleorg@example.com',
			password: '123456',
		})

		expect(org.id).toBeTypeOf('string')
	})

	it('should not be able to authenticate with wrong email', async () => {
		expect(async () => {
			await sut.execute({
				email: 'exampleorg@example.com', // user not yet created
				password: '123456',
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		await orgsRepository.create({
			name: 'Example org',
			email: 'exampleorg@example.com',
			password_hash: await hash('123456', 6),
			address: 'Example Org Address',
			phone_number: '12000000000',
		})

		expect(async () => {
			await sut.execute({
				email: 'exampleorg@example.com',
				password: 'wrong-password',
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
