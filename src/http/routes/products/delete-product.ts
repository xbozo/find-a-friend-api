import { supabase } from '@/app'
import type { FastifyInstance } from 'fastify'
import z from 'zod'

export const deleteProduct = async (app: FastifyInstance) => {
  app.delete('/products/:id', async (request, reply) => {
    const deleteProductParams = z.object({
      id: z.string(),
    })

    const { id } = deleteProductParams.parse(request.params)

    const { error: productError } = await supabase.from('products').delete().eq('id', id)

    if (productError) {
      return reply.send(productError)
    }

    return reply.status(204).send()
  })
}
