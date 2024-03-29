import { Org, Prisma } from '@prisma/client'

export type OrgsRepository = {
	create(data: Prisma.OrgCreateInput): Promise<Org>
}
