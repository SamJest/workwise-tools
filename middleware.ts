import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const user = process.env.ADMIN_BASIC_AUTH_USER;
  const password = process.env.ADMIN_BASIC_AUTH_PASSWORD;

  if (!user || !password) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Admin access is not configured.", { status: 404 });
    }

    return NextResponse.next();
  }

  const authorization = request.headers.get("authorization");
  if (isAuthorized(authorization, user, password)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="PSEO Admin"'
    }
  });
}

function isAuthorized(authorization: string | null, user: string, password: string) {
  if (!authorization?.startsWith("Basic ")) return false;

  try {
    const decoded = atob(authorization.slice("Basic ".length));
    const separator = decoded.indexOf(":");
    if (separator === -1) return false;

    const receivedUser = decoded.slice(0, separator);
    const receivedPassword = decoded.slice(separator + 1);
    return constantTimeEqual(receivedUser, user) && constantTimeEqual(receivedPassword, password);
  } catch {
    return false;
  }
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

export const config = {
  matcher: ["/admin/:path*"]
};
