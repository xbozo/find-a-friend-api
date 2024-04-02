import { Pet, Prisma } from '@prisma/client'

export type SearchManyParams = {
	city: string
	animal?: string
	animalSize?: number
	energyLevel?: number
	independencyLevel?: number
	ageInMonths?: number
}

export type PetsRepository = {
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
	findById(id: string): Promise<Pet | null>
	searchMany({
		city,
		animal,
		animalSize,
		energyLevel,
		independencyLevel,
		ageInMonths,
	}: SearchManyParams): Promise<Pet[] | null>
}
