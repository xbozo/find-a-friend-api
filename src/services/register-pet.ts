import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

type RegisterPetServiceParams = {
	name: string
	city: string
	animal: string
	animalSize: number
	ageInMonths: number
	energyLevel: number
	independencyLevel: number
	requirements: string[]
	orgId: string
}

type RegisterPetServiceResponse = {
	pet: Pet
}

export class RegisterPetService {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		ageInMonths,
		city,
		energyLevel,
		independencyLevel,
		name,
		requirements,
		animal,
		animalSize,
		orgId,
	}: RegisterPetServiceParams): Promise<RegisterPetServiceResponse> {
		const pet = await this.petsRepository.create({
			age_in_months: ageInMonths,
			city,
			energy_level: energyLevel,
			independency_level: independencyLevel,
			name,
			requirements,
			animal,
			animal_size: animalSize,
			org_id: orgId,
		})

		return {
			pet,
		}
	}
}
