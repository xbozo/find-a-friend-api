import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type FetchPetsServiceQuery = {
	city: string
	animalSize?: number
	animal?: string
	energyLevel?: number
	independencyLevel?: number
	ageInMonths?: number
}

type FetchPetsServiceResponse = {
	pets: Pet[]
}

export class FetchPetsService {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		city,
		animal,
		animalSize,
		energyLevel,
		independencyLevel,
		ageInMonths,
	}: FetchPetsServiceQuery): Promise<FetchPetsServiceResponse> {
		const pets = await this.petsRepository.searchMany({
			city,
			animal,
			animalSize,
			energyLevel,
			independencyLevel,
			ageInMonths,
		})

		if (!pets || pets.length === 0) {
			throw new ResourceNotFoundError()
		}

		return {
			pets,
		}
	}
}
