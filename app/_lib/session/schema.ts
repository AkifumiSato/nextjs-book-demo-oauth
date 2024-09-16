import { z } from "zod";
import { GithubAccessTokenResponse } from "../github";

const Authenticated = z.object({
  status: z.literal("authenticated"),
  github: GithubAccessTokenResponse,
});

const PreAuthenticated = z.object({
  status: z.literal("preauthenticated"),
  state: z.string().min(1).optional(),
});

export const SessionSchema = z
  .discriminatedUnion("status", [Authenticated, PreAuthenticated])
  .optional();

export type SessionValues = z.infer<typeof SessionSchema>;
