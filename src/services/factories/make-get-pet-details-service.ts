import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsService } from '../get-pet-details'

export const makeGetPetDetailsService = () => {
	const prismaPetsRepository = new PrismaPetsRepository()

	const service = new GetPetDetailsService(prismaPetsRepository)

	return service
}
