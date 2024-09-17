import Link from "next/link";

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
    </main>
  );
}
