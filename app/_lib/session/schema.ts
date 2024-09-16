import { z } from "zod";
import { GithubAccessTokenResponse } from "../github";

export const SessionSchema = z
  .object({
    status: z.enum(["authenticated", "unauthenticated"]),
    state: z.string().min(1).optional(), // CSRF Token used to GitHub OAuth
    github: GithubAccessTokenResponse.optional(),
  })
  .optional();

export type SessionValues = z.infer<typeof SessionSchema>;
export type SessionKeys = keyof Exclude<SessionValues, undefined>;
