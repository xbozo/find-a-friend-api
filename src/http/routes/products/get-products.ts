import { supabase } from '@/app'
import type { FastifyInstance } from 'fastify'

export const getProducts = async (app: FastifyInstance) => {
  app.get('/products', async (request, reply) => {
    const { data: products, error: productsError } = await supabase.from('products').select()

    if (productsError) {
      return reply.send(productsError)
    }

    return reply.send(products)
  })
}
