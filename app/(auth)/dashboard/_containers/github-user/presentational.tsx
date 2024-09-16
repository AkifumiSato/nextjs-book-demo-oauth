import type { GithubUserResponse } from "./schema";

export function GithubUserPresentational({
  githubUser,
}: {
  githubUser: GithubUserResponse;
}) {
  return (
    <>
      <h1>Github user api response</h1>
      <pre>
        <code>{JSON.stringify(githubUser, null, 2)}</code>
      </pre>
    </>
  );
}
