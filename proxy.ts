import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { routes } from "./lib/routes";

const blockedPaths = [
  "/servers",
  "/webdata",
  "/phpnuke",
  "/path",
  "/cm",
  "/cgi-shi",
  "/_vti_adm",
  "/_mmserverscripts",
];

const publicPaths = [
  routes.signIn,
  routes.signOut,
  routes.error,
  routes.home,
  routes.medicine,
];

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;

    // Allow public routes without authentication
    if (publicPaths.includes(pathname) || pathname.startsWith("/medicine/")) {
      return NextResponse.next();
    }

    // Block suspicious/scanner paths
    if (
      blockedPaths.some((path) => pathname.startsWith(path)) ||
      pathname.startsWith("/_") ||
      pathname.includes("cgi")
    ) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: routes.signIn,
      signOut: routes.signOut,
      error: routes.error,
    },

    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Public: /home and everything underneath it
        if (pathname === "/" || pathname.startsWith("/medicine/")) {
          return true;
        }

        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    {
      source: "/((?!env-config.js|auth/forgot-password|_next/|favicon.ico).*)",
    },
  ],
};
