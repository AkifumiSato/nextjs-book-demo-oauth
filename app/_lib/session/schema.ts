import { z } from "zod";
import { GithubAccessTokenResponse } from "../github";

const Authenticated = z.object({
  status: z.literal("authenticated"),
  github: GithubAccessTokenResponse,
});

const Unauthenticated = z.object({
  status: z.literal("unauthenticated"),
  state: z.string().min(1).optional(),
});

export const SessionSchema = z
  .discriminatedUnion("status", [Authenticated, Unauthenticated])
  .optional();

export type SessionValues = z.infer<typeof SessionSchema>;
