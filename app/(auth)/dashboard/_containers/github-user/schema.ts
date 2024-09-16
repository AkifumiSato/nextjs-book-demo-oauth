import { z } from "zod";

// Partial type
export const GithubUserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

export type GithubUserResponse = z.infer<typeof GithubUserResponseSchema>;
