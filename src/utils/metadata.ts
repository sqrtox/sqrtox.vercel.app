import type { Metadata } from "next";
import { headers } from "next/headers";
import { siteDescription, siteName, siteShortDescription } from "@/constants/site";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const generateDefaultMetadata = (): Metadata => {
  const url = new URL(headers().get("x-url") as string);

  return {
    metadataBase: BASE_URL === undefined ? undefined : new URL(BASE_URL),
    title: {
      default: `${siteName} - ${siteShortDescription}`,
      template: `%s | ${siteName}`
    },
    description: siteDescription,
    twitter: {
      card: "summary_large_image"
    },
    openGraph: {
      url: url.href,
      type: url.pathname === "/" ? "website" : "article",
      siteName,
      title: {
        default: `${siteName} - ${siteShortDescription}`,
        template: `%s | ${siteName}`
      },
      description: siteDescription,
      images: [
        {
          alt: "",
          width: 1200,
          height: 630,
          type: "image/png",
          url: "/images/ogp-image-1200x630.png"
        }
      ]
    },
    icons: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/favicons/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicons/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "194x194",
        url: "/favicons/favicon-194x194.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/favicons/android-chrome-192x192.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicons/favicon-16x16.png"
      },
      {
        rel: "shortcut icon",
        url: "/favicons/favicon.ico"
      }
    ],
    manifest: "/favicons/site.webmanifest",
    other: {
      "msapplication-TileColor": "#2d89ef",
      "msapplication-TileImage": "/favicons/mstile-144x144.png",
      "msapplication-config": "/favicons/browserconfig.xml"
    }
  };
};

export const generateNotFoundMetadata = (): Metadata => {
  const title = "ページが見つかりませんでした";
  const description = "ページが見つかりませんでした";

  return {
    title,
    description,
    openGraph: {
      title,
      description
    }
  };
};
