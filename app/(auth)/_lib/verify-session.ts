import { RedirectType, redirect } from "next/navigation";
import { sessionStore } from "../../_lib/session";

export async function verifySession() {
  const sessionValues = await sessionStore.get();
  if (sessionValues?.status !== "authenticated") {
    redirect("/login", RedirectType.replace);
  }
  return sessionValues;
}
