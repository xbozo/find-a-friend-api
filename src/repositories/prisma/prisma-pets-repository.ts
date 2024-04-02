import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository, SearchManyParams } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = await prisma.pet.create({
			data,
		})

		return pet
	}

	async findById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: {
				id,
			},
		})

		return pet
	}

	async searchMany({
		city,
		animal,
		animalSize,
		energyLevel,
		independencyLevel,
		ageInMonths,
	}: SearchManyParams) {
		const pets = await prisma.pet.findMany({
			where: {
				city: {
					contains: city,
					mode: 'insensitive',
				},
				animal: {
					mode: 'insensitive',
					equals: animal,
				},
				animal_size: animalSize,
				energy_level: energyLevel,
				independency_level: independencyLevel,
				age_in_months: {
					gte: ageInMonths,
				},
			},
		})

		return pets
	}
}
