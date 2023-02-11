import { z } from 'zod'


export const serverScheme = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    AUTH_TRUST_HOST: z
        .enum(['true', 'false'])
        .default('false')
        .transform((value) => value === 'true'),
    DATABASE_URL: z.string(),
    START_BASE_URL: z.string().optional().default('https://glo-3202.vercel.app'),
    AUTH_SECRET: z.string(),
})

export const clientScheme = z.object({
    MODE: z.enum(['development', 'production', 'test']).default('development'),
    START_BASE_URL: z.string().optional().default('http://127.0.0.1:3000'),
})
