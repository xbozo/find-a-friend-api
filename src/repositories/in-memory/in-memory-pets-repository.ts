import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
	public items: Pet[] = []

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = {
			id: data.id ?? randomUUID(),
			name: data.name,
			city: data.city,
			age_in_months: data.age_in_months,
			independency_level: data.independency_level,
			energy_level: data.energy_level,
			requirements: data.requirements as string[],
			org_email: data.org_email,
		}

		this.items.push(pet)

		return pet
	}
}
