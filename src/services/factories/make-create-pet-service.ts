import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetService } from '../create-pet'

export const makeCreatePetService = () => {
	const prismaPetsRepository = new PrismaPetsRepository()
	const prismaOrgsRepository = new PrismaOrgsRepository()

	const service = new CreatePetService(prismaPetsRepository, prismaOrgsRepository)

	return service
}
