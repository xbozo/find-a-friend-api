import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetPetDetailsServiceParams = {
	petId: string
}

type GetPetDetailsServiceResponse = {
	pet: Pet
}

export class GetPetDetailsService {
	constructor(private petsRepository: PetsRepository) {}

	async execute({ petId }: GetPetDetailsServiceParams): Promise<GetPetDetailsServiceResponse> {
		const pet = await this.petsRepository.findById(petId)

		if (!pet) {
			throw new ResourceNotFoundError()
		}

		return {
			pet,
		}
	}
}
