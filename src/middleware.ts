import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/donate", "/volunteer", "/rebate", "/about"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (!isProtected) return NextResponse.next();

  const unlocked = req.cookies.get("site_unlocked")?.value === "1";
  if (unlocked) return NextResponse.next();

  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/donate/:path*", "/volunteer/:path*", "/rebate/:path*", "/about/:path*"],
};
