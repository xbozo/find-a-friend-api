import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgService } from '../create-org'

export const makeCreateOrgService = () => {
	const prismaOrgsRepository = new PrismaOrgsRepository()
	const service = new CreateOrgService(prismaOrgsRepository)

	return service
}
