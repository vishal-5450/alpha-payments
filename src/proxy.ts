import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/**
 * Guards the hidden HR console. Everything under /console requires a valid session
 * cookie except the login page. Server Functions re-check the session themselves.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = pathname === "/console/login";

  let response: NextResponse;
  if (isLogin && session) {
    response = NextResponse.redirect(new URL("/console", request.url));
  } else if (!isLogin && !session) {
    const url = new URL("/console/login", request.url);
    if (pathname !== "/console") url.searchParams.set("next", pathname);
    response = NextResponse.redirect(url);
  } else {
    response = NextResponse.next();
  }

  // Keep the console out of search engines and caches.
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/console", "/console/:path*"],
};
