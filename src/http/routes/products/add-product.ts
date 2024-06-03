import { supabase } from '@/app'
import type { FastifyInstance } from 'fastify'
import z from 'zod'

export const addProduct = async (app: FastifyInstance) => {
  app.post('/products', async (request, reply) => {
    const addProductSchema = z.object({
      name: z.string(),
      price: z.string(),
      description: z.string(),
    })

    const { name, description, price } = addProductSchema.parse(request.body)

    const { error: productError } = await supabase
      .from('products')
      .insert({ name, description, price })

    if (productError) {
      return reply.send(productError)
    }

    return reply.status(204).send()
  })
}
