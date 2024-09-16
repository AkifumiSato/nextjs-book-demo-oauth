import Link from "next/link";
import { logout } from "./_actions/logout";
import { session } from "./_lib/session";

export default async function Page() {
  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <ul>
        <li>
          <Link href="/login">login</Link>
        </li>
        <li>
          <Link href="/dashboard">dashboard</Link>
        </li>
      </ul>
      <Debug />
    </main>
  );
}

async function Debug() {
  const sessionValues = (await session()).get();

  return (
    <>
      <section>
        <h2>Debug</h2>
        {!sessionValues && "session is empty."}
        {sessionValues && (
          <code>
            <pre>{JSON.stringify(sessionValues, null, 2)}</pre>
          </code>
        )}
        <form action={logout}>
          <button type="submit">Logout</button>
        </form>
      </section>
    </>
  );
}
