import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

type CreateOrgServiceParams = {
	name: string
	email: string
	password: string
	address: string
	phoneNumber: string
}

type CreateOrgServiceResponse = {
	org: Org
}

export class CreateOrgService {
	constructor(private orgsRepository: OrgsRepository) {}

	async execute({
		address,
		email,
		name,
		password,
		phoneNumber,
	}: CreateOrgServiceParams): Promise<CreateOrgServiceResponse> {
		const password_hash = await hash(password, 6)

		const org = await this.orgsRepository.create({
			address,
			email,
			name,
			password_hash,
			phone_number: phoneNumber,
		})

		return {
			org,
		}
	}
}
