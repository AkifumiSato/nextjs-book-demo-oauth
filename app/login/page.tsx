import { login } from "../_actions/login";

export default async function Page() {
  return (
    <main>
      <h1>Login</h1>
      <form action={login}>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
