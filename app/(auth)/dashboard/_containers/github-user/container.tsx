import { UnAuthorizedError } from "../../../../_lib/utils/errors";
import { fetchGithubUser } from "./fetchers";
import { GithubUserPresentational } from "./presentational";

export async function GithubUser() {
  try {
    const githubUser = await fetchGithubUser();

    return <GithubUserPresentational githubUser={githubUser} />;
  } catch (e) {
    if (e instanceof UnAuthorizedError) {
      return <div>アクセス権限がありません。再度ログインしてください。</div>;
    }
    throw e;
  }
}
