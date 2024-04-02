import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsService } from '../fetch-pets'

export const makeFetchPetsService = () => {
	const prismaPetsRepository = new PrismaPetsRepository()

	const service = new FetchPetsService(prismaPetsRepository)

	return service
}
