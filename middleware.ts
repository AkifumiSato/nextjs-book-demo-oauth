import { minimatch } from "minimatch";
import { type NextRequest, NextResponse } from "next/server";
import { getSessionId } from "./app/_lib/session/utils";

const protectedRoutes = ["/dashboard/*"];
const publicRoutes = ["/login", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const sessionId = await getSessionId();

  const isProtectedRoute = protectedRoutes.some((route) =>
    minimatch(path, route),
  );
  if (isProtectedRoute && !sessionId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const isPublicRoute = publicRoutes.some((route) => minimatch(path, route));
  if (isPublicRoute && sessionId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
