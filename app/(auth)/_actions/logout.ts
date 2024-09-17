"use server";

import { RedirectType, redirect } from "next/navigation";
import { sessionStore } from "../../_lib/session";

export async function logout() {
  await sessionStore.destroy();
  redirect("/", RedirectType.replace);
}
