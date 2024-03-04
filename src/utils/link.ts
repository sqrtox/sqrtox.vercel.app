const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const isExternalLink = (url: string): boolean => {
  return new URL(url, BASE_URL).host !== new URL(BASE_URL).host;
};
