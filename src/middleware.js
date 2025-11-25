import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/register"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const token = cookieStore?.get("token");

  const csrfToken = cookieStore?.get("XSRF-TOKEN");

  if (publicRoutes.includes(pathname) && token && csrfToken) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!publicRoutes.includes(pathname) && (!token || !csrfToken)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
