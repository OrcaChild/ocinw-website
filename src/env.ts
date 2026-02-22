import { z } from "zod";

/**
 * Server-side environment variables (not exposed to the browser).
 */
const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().startsWith("re_"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

/**
 * Client-side environment variables (exposed via NEXT_PUBLIC_ prefix).
 */
const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_NOAA_API_URL: z.url(),
  NEXT_PUBLIC_OPEN_METEO_URL: z.url(),
  NEXT_PUBLIC_ZEFFY_EMBED_URL: z.url(),
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1),
});

/**
 * Combined schema for validation.
 * Only validate server vars when running on the server.
 */
const envSchema = typeof window === "undefined"
  ? serverSchema.merge(clientSchema)
  : clientSchema;

function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error(
      "Invalid environment variables:",
      result.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables. Check server logs.");
  }

  return result.data;
}

export const env = validateEnv();
