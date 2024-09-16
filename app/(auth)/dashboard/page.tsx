import { z } from "zod";
import { verifySession } from "../_lib/verify-session";

export default async function Page() {
  const sessionValues = await verifySession();

  const githubUser = await fetch("https://api.github.com/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionValues.github.access_token}`,
    },
  }).then(async (res) => {
    if (!res.ok) {
      console.error(res.status, await res.json());
      throw new Error("failed to get github user");
    }
    return GithubUserResponse.parse(await res.json());
  });

  return (
    <>
      <h1>Github user api response</h1>
      <pre>
        <code>{JSON.stringify(githubUser, null, 2)}</code>
      </pre>
    </>
  );
}

export const metadata = {
  title: "Github User",
};

// Partial type
const GithubUserResponse = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});
