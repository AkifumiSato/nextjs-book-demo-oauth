import { UnAuthorizedError } from "../../../../_lib/utils/errors";
import { handleWithZod } from "../../../../_lib/utils/fetch-handler";
import { verifySession } from "../../../_lib/verify-session";
import { GithubUserResponseSchema } from "./schema";

export async function fetchGithubUser() {
  const sessionValues = await verifySession();

  return fetch("https://api.github.com/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionValues.github.accessToken}`,
    },
  })
    .then((res) => {
      if (res.status === 401) {
        throw new UnAuthorizedError();
      }
      return res;
    })
    .then(handleWithZod(GithubUserResponseSchema));
}
