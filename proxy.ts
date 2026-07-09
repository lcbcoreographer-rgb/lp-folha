import { NextResponse, type NextRequest } from "next/server";
import { LEADS_SESSION_COOKIE, isValidSession } from "@/app/lib/leadsAuth";

const PUBLIC_PATHS = ["/leads/login", "/api/leads/auth"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host")?.split(":")[0] || "";
  const isCrmPath = pathname.startsWith("/leads") || pathname.startsWith("/api/leads");

  // Separação por domínio: só entra em vigor se CRM_DOMAIN estiver configurado
  // (em dev, sem essa env var, o CRM continua acessível em qualquer host).
  const crmDomain = process.env.CRM_DOMAIN;
  if (crmDomain) {
    const onCrmDomain = hostname === crmDomain;

    if (onCrmDomain) {
      if (pathname === "/") {
        return NextResponse.redirect(new URL("/leads", request.url));
      }
      if (!isCrmPath) {
        return new NextResponse("Not found", { status: 404 });
      }
    } else if (isCrmPath) {
      // Domínio da LP não expõe o CRM.
      return new NextResponse("Not found", { status: 404 });
    }
  }

  if (!isCrmPath) {
    return NextResponse.next();
  }

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|logo.png).*)"],
};
