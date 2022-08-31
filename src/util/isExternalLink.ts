const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const isExternalLink = (href: string): boolean => (
  new URL(href, BASE_URL).host !== new URL(BASE_URL).host
);

export { isExternalLink };
