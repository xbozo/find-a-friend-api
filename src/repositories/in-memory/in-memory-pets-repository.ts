import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository, SearchManyParams } from '../pets-repository'

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
			animal: data.animal,
			animal_size: data.animal_size,
			requirements: data.requirements as string[],
			org_id: data.org_id,
		}

		this.items.push(pet)

		return pet
	}

	async findById(id: string) {
		const pet = this.items.find((item) => item.id === id)

		if (!pet) {
			return null
		}

		return pet
	}

	async searchMany({ city, animal, animalSize, energyLevel, independencyLevel }: SearchManyParams) {
		let pets = this.items.filter((pet) => pet.city.toLowerCase().includes(city.toLowerCase()))

		if (animal) pets = pets.filter((pet) => pet.animal.toLowerCase().includes(animal.toLowerCase()))
		if (animalSize) pets = pets.filter((pet) => pet.animal_size === animalSize)
		if (energyLevel) pets = pets.filter((pet) => pet.energy_level === energyLevel)
		if (independencyLevel) pets = pets.filter((pet) => pet.independency_level === independencyLevel)

		if (!pets) {
			return null
		}

		return pets
	}
}
