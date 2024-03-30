import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found'

type CreatePetServiceParams = {
	name: string
	city: string
	ageInMonths: number
	energyLevel: number
	independencyLevel: number
	requirements: string[]
	orgEmail: string
}

type CreatePetServiceResponse = {
	pet: Pet
}

export class CreatePetService {
	constructor(private petsRepository: PetsRepository, private orgsRepository: OrgsRepository) {}

	async execute({
		ageInMonths,
		city,
		energyLevel,
		independencyLevel,
		name,
		requirements,
		orgEmail,
	}: CreatePetServiceParams): Promise<CreatePetServiceResponse> {
		const locateOrgByEmail = await this.orgsRepository.findByEmail(orgEmail)

		if (!locateOrgByEmail) {
			throw new OrgNotFoundError()
		}

		const pet = await this.petsRepository.create({
			age_in_months: ageInMonths,
			city,
			energy_level: energyLevel,
			independency_level: independencyLevel,
			name,
			requirements,
			org_email: orgEmail,
		})

		return {
			pet,
		}
	}
}
