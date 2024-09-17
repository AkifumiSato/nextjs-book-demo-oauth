"use server";

import { RedirectType, redirect } from "next/navigation";
import { session } from "../_lib/session";

export async function logout() {
  const sessionStore = await session();
  await sessionStore.destroy();
  redirect("/", RedirectType.replace);
}
