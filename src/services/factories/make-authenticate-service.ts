import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateService } from '../authenticate'

export const makeAuthenticateService = () => {
	const prismaOrgsRepository = new PrismaOrgsRepository()
	const service = new AuthenticateService(prismaOrgsRepository)

	return service
}
