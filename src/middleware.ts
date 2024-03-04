import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import builder from "content-security-policy-builder";
import { generateNonce } from "@/utils/nonce";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const development = process.env.NODE_ENV === "development";

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const assignHeaders = (targetHeaders: Headers, sourceHeaders: Headers): void => {
    for (const [name, value] of sourceHeaders) {
      targetHeaders.set(name, value);
    }
  };

  const securityHeaders = new Headers({
    "Access-Control-Allow-Origin": BASE_URL as string,
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": (
      "accelerometer=(), " +
      "autoplay=(), " +
      "camera=(), " +
      "cross-origin-isolated=(), " +
      "display-capture=(), " +
      "document-domain=(), " +
      "encrypted-media=(), " +
      "fullscreen=(), " +
      "geolocation=(), " +
      "gyroscope=(), " +
      "keyboard-map=(), " +
      "magnetometer=(), " +
      "microphone=(), " +
      "midi=(), " +
      "payment=(), " +
      "picture-in-picture=(), " +
      "publickey-credentials-get=(), " +
      "screen-wake-lock=(), " +
      "sync-xhr=(), " +
      "usb=(), " +
      "web-share=(), " +
      "xr-spatial-tracking=(), " +
      "clipboard-read=(), " +
      "clipboard-write=(), " +
      "gamepad=(), " +
      "hid=(), " +
      "idle-detection=(), " +
      "interest-cohort=(), " +
      "serial=(), " +
      "trust-token-redemption=()"
    )
  });

  if (!development) {
    const nonce = generateNonce();

    securityHeaders.set("Content-Security-Policy", builder({
      directives: {
        scriptSrc: [
          "'self'",
          `'nonce-${nonce}'`
        ],
        objectSrc: "'self'",
        baseUri: "'self'"
      }
    }));
  }

  const requestHeaders = new Headers(request.headers);

  assignHeaders(requestHeaders, securityHeaders);

  requestHeaders.set("x-url", request.url);

  let response: NextResponse;

  const redirects = [
    {
      from: ["articles", "blog", "posts", "post"],
      to: "article"
    },
    {
      from: ["tags"],
      to: "tag"
    }
  ];

  for (const { from, to } of redirects) {
    for (const path of from) {
      const nextUrlPaths = request.nextUrl.pathname.split("/");

      if (!nextUrlPaths.includes(path)) {
        continue;
      }

      const url = new URL(request.nextUrl);

      url.pathname = nextUrlPaths.map(p => p === path ? to : p).join("/");

      response = NextResponse.redirect(url, 301);

      break;
    }
  }

  response ??= NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  assignHeaders(response.headers, securityHeaders);

  response.headers.set("x-url", request.url);

  return response;
};
