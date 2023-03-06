import { z } from "zod";

export const serverScheme = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  ENABLE_VC_BUILD: z
    .string()
    .default("1")
    .transform((v) => parseInt(v)),
  ALTOGIC_CLIENT_KEY: z.string(),
  ALTOGIC_URL: z.string(),
});

export const clientScheme = z.object({
  MODE: z.enum(["development", "production", "test"]).default("development"),
  ALTOGIC_CLIENT_KEY: z.string(),
  ALTOGIC_URL: z.string(),
});
