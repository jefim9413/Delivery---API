import { PrismaProductsRepository } from '@/core/repositories/prisma/prisma-products-repository'
import { CreateProductUseCase } from '@/core/usecases/create-product'

export function makeCreateProduct() {
  const productsRepository = new PrismaProductsRepository()
  const createProductUseCase = new CreateProductUseCase(productsRepository)
  return createProductUseCase
}
