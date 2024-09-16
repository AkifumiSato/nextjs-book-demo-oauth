"use server";

import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, session } from "../_lib/session";

export async function logout() {
  const sessionStore = await session();
  await sessionStore.update((_prev) => undefined);
  cookies().delete(SESSION_COOKIE_NAME);
  redirect("/", RedirectType.replace);
}
