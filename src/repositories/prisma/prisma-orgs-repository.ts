import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
	async create(data: Prisma.OrgCreateInput) {
		const org = await prisma.org.create({
			data,
		})

		return org
	}
}
