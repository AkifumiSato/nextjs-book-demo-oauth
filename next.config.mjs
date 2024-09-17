import { z } from "zod";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
};

export default nextConfig;

// validate env
const envSchema = z.object({
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  SESSION_SECRET: z.string(),
});

try {
  envSchema.parse(process.env);
} catch (error) {
  console.error("`process.env` validation failed. zodError:", error.errors);
  process.exit(1);
}
