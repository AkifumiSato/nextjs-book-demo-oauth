import { z } from "zod";

const Authenticated = z.object({
  status: z.literal("authenticated"),
  github: z.object({
    accessToken: z.string(),
    tokenType: z.string(),
    scope: z.string(),
  }),
});

const PreAuthenticated = z.object({
  status: z.literal("preauthenticated"),
  state: z.string().min(1).optional(),
});

export const SessionSchema = z
  .discriminatedUnion("status", [Authenticated, PreAuthenticated])
  .optional();

export type SessionValues = z.infer<typeof SessionSchema>;
