import { ProductsRepository } from '../repositories/products-repository'

export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute() {
    const products = await this.productsRepository.findAll()
    return { products }
  }
}
