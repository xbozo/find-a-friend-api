import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
	public items: Org[] = []

	async create(data: Prisma.OrgCreateInput) {
		const org = {
			id: data.id ?? randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			address: data.address,
			phone_number: data.phone_number,
		}

		this.items.push(org)

		return org
	}

	async findByEmail(email: string) {
		const org = this.items.find((org) => org.email === email)

		if (!org) {
			return null
		}

		return org
	}
}
