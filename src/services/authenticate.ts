import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

type AuthenticateServiceParams = {
	email: string
	password: string
}

type AuthenticateServiceResponse = {
	org: Org
}

export class AuthenticateService {
	constructor(private orgsRepository: OrgsRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateServiceParams): Promise<AuthenticateServiceResponse> {
		const org = await this.orgsRepository.findByEmail(email)

		if (!org) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await compare(password, org.password_hash)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		return {
			org,
		}
	}
}
