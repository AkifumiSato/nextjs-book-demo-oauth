import { z } from "zod";

export const GithubAccessTokenResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
});
