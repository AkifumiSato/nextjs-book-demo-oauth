import { RedirectType, redirect } from "next/navigation";
import { session } from "../../_lib/session";

export async function verifySession() {
  const sessionStore = await session();
  const sessionValues = sessionStore.get();
  if (sessionValues?.status !== "authenticated") {
    redirect("/", RedirectType.replace);
  }
  return sessionValues;
}
