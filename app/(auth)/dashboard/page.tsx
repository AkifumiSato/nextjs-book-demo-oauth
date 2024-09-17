import { session } from "../../_lib/session";
import { logout } from "../_actions/logout";
import { GithubUser } from "./_containers/github-user";

export default async function Page() {
  return (
    <>
      <GithubUser />
      <Debug />
    </>
  );
}

export const metadata = {
  title: "Github User",
};

async function Debug() {
  const sessionValues = (await session()).get();

  return (
    <>
      <section>
        <h2>Debug</h2>
        {!sessionValues && "session is empty."}
        {sessionValues && (
          <>
            <code>
              <pre>{JSON.stringify(sessionValues, null, 2)}</pre>
            </code>
            <form action={logout}>
              <button type="submit">Logout</button>
            </form>
          </>
        )}
      </section>
    </>
  );
}
