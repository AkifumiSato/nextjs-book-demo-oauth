import { fetchGithubUser } from "./fetchers";
import { GithubUserPresentational } from "./presentational";

export async function GithubUser() {
  const githubUser = await fetchGithubUser();

  return <GithubUserPresentational githubUser={githubUser} />;
}
