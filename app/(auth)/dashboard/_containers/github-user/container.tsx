import { fetchGithubUser } from "../../_lib/fetcher/github-user";
import { GithubUserPresentational } from "./presentational";

export async function GithubUser() {
  const githubUser = await fetchGithubUser();

  return <GithubUserPresentational githubUser={githubUser} />;
}
