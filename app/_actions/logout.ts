"use server";

import { RedirectType, redirect } from "next/navigation";
import { session } from "../_lib/session";

export async function logout() {
  const sessionStore = await session();
  await sessionStore.update((_prev) => {
    return {
      status: "unauthenticated",
    };
  });
  redirect("/", RedirectType.replace);
}
