import { GithubUser } from "./_containers/github-user";

export default async function Page() {
  return (
    <>
      <GithubUser />
    </>
  );
}

export const metadata = {
  title: "Github User",
};
