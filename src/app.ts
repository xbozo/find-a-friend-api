import fastifyCors from '@fastify/cors'
import { createClient } from '@supabase/supabase-js'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { addProduct } from './http/routes/products/add-product'
import { deleteProduct } from './http/routes/products/delete-product'
import { getProducts } from './http/routes/products/get-products'
import { updateProduct } from './http/routes/products/update-product'
export const app = fastify()

const supabaseUrl = 'https://mjqcfgnbljuntpygxmgp.supabase.co'
const supabaseKey = env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

app.register(fastifyCors)

app.register(addProduct)
app.register(getProducts)
app.register(updateProduct)
app.register(deleteProduct)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // whatever
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
