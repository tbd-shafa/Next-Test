import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get the platform from the cookies
  const platform = request.cookies.get("platform")?.value;
  const storedPlatform = platform === "app";
 console.log("storedPlatform from middelware",storedPlatform)
  // Detect if the user is on a mobile browser
  const userAgent = request.headers.get("user-agent")?.toLowerCase();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent || "");

  // Define allowed pages for app users
  const allowedAppPages = [
    "/user/verify",
    //"/subscriptions",
    "/subscription-confirm",
    "/payment-return",
  ];
  // if (isMobile && !storedPlatform) {
  //   return NextResponse.redirect(new URL("/not-allowed", request.url));
  // }
  // If the user is on mobile and is NOT from the app, restrict access
  if (isMobile && !storedPlatform && !allowedAppPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/not-allowed", request.url));
  }
  if (isMobile && storedPlatform && pathname === "/user/verify") {
    return NextResponse.next(); // Allow access to /user/verify on mobile when platform is app
  }
  if (isMobile && storedPlatform && !allowedAppPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/not-allowed", request.url));
  }
  return NextResponse.next();
}

// Define routes where the middleware should apply
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/about",
    "/help",
    "/share",
    "/contact",
    "/terms",
    "/privacy",
    "/UserProfile",
    "/forgot-password",
    "/register",
    "/features",
    "/add-patient",
    "/edit-patient/:path*",
    "/patient/:path*",
    "/user/:path*",
   "/subscriptions",
    "/subscription-confirm",
    "/payment-return",
  ],
};
