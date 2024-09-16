import { session } from "./lib/session";

export default async function Page() {
  const sessionValues = (await session()).getAll();

  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <h2>Session:</h2>
      {!sessionValues && "session is empty."}
      {sessionValues && (
        <code>
          <pre>{JSON.stringify(sessionValues, null, 2)}</pre>
        </code>
      )}
    </main>
  );
}
