import { NextResponse, type NextRequest } from "next/server";
import { LEADS_SESSION_COOKIE, isValidSession } from "@/app/lib/leadsAuth";

const PUBLIC_PATHS = ["/leads/login", "/api/leads/auth"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname === path)) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(LEADS_SESSION_COOKIE)?.value;
  let authenticated = false;
  try {
    authenticated = await isValidSession(cookie);
  } catch (err) {
    console.error("[leads] painel mal configurado:", err);
  }

  if (authenticated) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/leads")) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const loginUrl = new URL("/leads/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/leads/:path*", "/api/leads/:path*"],
};
