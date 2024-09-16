import Link from "next/link";
import { login } from "../_actions/login";
import { logout } from "../_actions/logout";
import { session } from "../_lib/session";

export default async function Page() {
  const sessionValues = (await session()).get();

  return (
    <main>
      <h1>Login</h1>
      <form action={login}>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
