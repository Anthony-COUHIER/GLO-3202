import { z } from 'zod'


export const serverScheme = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    AUTH_TRUST_HOST: z
        .enum(['true', 'false'])
        .default('false')
        .transform((value) => value === 'true'),
    DATABASE_URL: z.string(),
    START_BASE_URL: z.preprocess(
        // This makes Vercel deployments not fail if you don't set START_BASE_URL
        // Since NextAuth.js automatically uses the VERCEL_URL if present.
        (str) => process.env.VERCEL_URL ?? str,
        // VERCEL_URL doesn't include `https` so it cant be validated as a URL
        process.env.VERCEL ? z.string() : z.string().url(),
    ),
    AUTH_SECRET: z.string(),
})

export const clientScheme = z.object({
    MODE: z.enum(['development', 'production', 'test']).default('development'),
    START_BASE_URL:  z.preprocess(
        // This makes Vercel deployments not fail if you don't set START_BASE_URL
        // Since NextAuth.js automatically uses the VERCEL_URL if present.
        (str) => process.env.VERCEL_URL ?? str,
        // VERCEL_URL doesn't include `https` so it cant be validated as a URL
        process.env.VERCEL ? z.string() : z.string().url(),
    ),
})
