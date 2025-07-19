import { Product } from '@prisma/client'
import { ProductsRepository } from '../repositories/products-repository'

interface CreateProductUseCaseRequest {
  name: string
  description: string
  imageUrl?: string
  price: number
}

interface CreateProductUseCaseResponse {
  product: Product
}
export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}
  async execute({
    name,
    description,
    imageUrl,
    price,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = await this.productsRepository.create({
      name,
      description,
      imageUrl,
      price,
    })
    return { product }
  }
}
