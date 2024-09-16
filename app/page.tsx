import Link from "next/link";
import { login } from "./_actions/login";
import { logout } from "./_actions/logout";
import { session } from "./_lib/session";

export default async function Page() {
  const sessionValues = (await session()).getAll();

  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <section>
        <h2>Session:</h2>
        {!sessionValues && "session is empty."}
        {sessionValues && (
          <code>
            <pre>{JSON.stringify(sessionValues, null, 2)}</pre>
          </code>
        )}
      </section>
      <section>
        <h2>OAuth</h2>
        <form action={login}>
          <button type="submit">Login</button>
        </form>
        <form action={logout}>
          <button type="submit">Logout</button>
        </form>
        <ul>
          <li>
            <Link href="/dashboard">dashboard</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
