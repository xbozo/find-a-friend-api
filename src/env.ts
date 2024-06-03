import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  SUPABASE_KEY: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (parsedEnv.success === false) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format())

  throw new Error('❌ Invalid environment variables!')
}

export const env = parsedEnv.data
