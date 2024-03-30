import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetService } from '../register-pet'

export const makeRegisterPetService = () => {
	const prismaPetsRepository = new PrismaPetsRepository()

	const service = new RegisterPetService(prismaPetsRepository)

	return service
}
