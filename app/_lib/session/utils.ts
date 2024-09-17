import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "./cookie-names";
import { decrypt } from "./jwt";

export async function getSessionId() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (sessionCookie === undefined) {
    return undefined;
  }
  const payload = await decrypt(sessionCookie);
  return payload?.sessionId;
}
