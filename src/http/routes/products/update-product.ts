import { supabase } from '@/app'
import type { FastifyInstance } from 'fastify'
import z from 'zod'

export const updateProduct = async (app: FastifyInstance) => {
  app.put('/products/:id', async (request, reply) => {
    const updateProductSchema = z.object({
      name: z.string(),
      price: z.string(),
      description: z.string(),
    })
    const updateProductParams = z.object({
      id: z.string(),
    })

    const { name, description, price } = updateProductSchema.parse(request.body)
    const { id } = updateProductParams.parse(request.params)

    if (!name || !description || !price) {
      return reply.status(400).send()
    }

    const { error: productError } = await supabase
      .from('products')
      .update({ name, description, price })
      .eq('id', id)

    if (productError) {
      return reply.send(productError)
    }

    return reply.status(204).send()
  })
}
