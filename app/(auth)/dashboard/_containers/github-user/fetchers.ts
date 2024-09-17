import { verifySession } from "../../../_lib/verify-session";
import { GithubUserResponseSchema } from "./schema";

export async function fetchGithubUser() {
  const sessionValues = await verifySession();

  return fetch("https://api.github.com/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionValues.github.accessToken}`,
    },
  }).then(async (res) => {
    if (!res.ok) {
      console.error(res.status, await res.json());
      throw new Error("failed to get github user");
    }
    return GithubUserResponseSchema.parse(await res.json());
  });
}
