import { RedirectType, redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { session } from "../../../_lib/session";
import { handleWithZod } from "../../../_lib/utils/fetch-handler";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
  if (GITHUB_CLIENT_ID === undefined || GITHUB_CLIENT_SECRET === undefined) {
    throw new Error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not defined");
  }

  const sessionStore = await session();
  const sessionValues = sessionStore.get();
  if (sessionValues?.status !== "preauthenticated") {
    throw new Error("CSRF Token not found in session.");
  }

  const searchParams = request.nextUrl.searchParams;

  // check state(csrf token)
  const urlState = searchParams.get("state");
  if (sessionValues.state !== urlState) {
    console.error("CSRF Token", sessionValues, urlState);
    throw new Error("CSRF Token not equaled.");
  }

  const code = searchParams.get("code");
  const githubResponse = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
    {
      method: "GET",
      headers: {
        Accept: " application/json",
      },
    },
  ).then(handleWithZod(GithubAccessTokenResponse));

  await sessionStore.update((_prev) => {
    return {
      status: "authenticated",
      github: {
        accessToken: githubResponse.access_token,
        tokenType: githubResponse.token_type,
        scope: githubResponse.scope,
      },
    };
  });

  redirect("/", RedirectType.replace);
}

const GithubAccessTokenResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
});
