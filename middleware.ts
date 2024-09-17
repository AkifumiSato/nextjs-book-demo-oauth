import { type NextRequest, NextResponse } from "next/server";
import { isMatch } from "picomatch";
import { getSessionId } from "./app/_lib/session/utils";

const protectedRoutes = ["/dashboard/*"];
const publicRoutes = ["/", "/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const sessionId = await getSessionId();

  if (isMatch(path, protectedRoutes) && !sessionId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isMatch(path, publicRoutes) && sessionId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
