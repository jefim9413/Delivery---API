import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().min(3, 'Descrição deve ter pelo menos 3 caracteres'),
  imageUrl: z.string(),
  price: z.number(),
})

export type CreateProductSchema = z.infer<typeof createProductSchema>

export type CreateProductDTO = {
  name: string
  description: string
  imageUrl: string
  price: number
}
