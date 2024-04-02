import { Pet, Prisma } from '@prisma/client'

export type PetsRepository = {
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
	findById(id: string): Promise<Pet | null>
}
