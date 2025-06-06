import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./next-auth/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  console.log("SESSSSSSSSSSSSSSION", session);

  const isLoggedIn = !!session;
  const isAuthPage = request.nextUrl.pathname === "/logged-out";
  const isHomePage = request.nextUrl.pathname === "/";
  const isTendancePage = request.nextUrl.pathname === "/tendance";
  const isRecherchePage = request.nextUrl.pathname === "/recherche";
  const isProfilePage = request.nextUrl.pathname === "/profile";

  // If user is not logged in and trying to access protected routes
  if (
    !isLoggedIn &&
    !isAuthPage &&
    (isHomePage || isTendancePage || isRecherchePage || isProfilePage)
  ) {
    return NextResponse.redirect(new URL("/logged-out", request.url));
  }

  // If user is logged in and trying to access auth pages
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

//  "Matching Paths"
export const config = {
  matcher: ["/", "/logged-out", "/tendance", "/recherche", "/profile"],
};
