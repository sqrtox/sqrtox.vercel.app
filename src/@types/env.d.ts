declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SITE_NAME: string;
    readonly NEXT_PUBLIC_SITE_DESCRIPTION: string;
    readonly NEXT_PUBLIC_SITE_SHORT_DESCRIPTION: string;
    readonly NEXT_PUBLIC_BASE_URL: string;
    readonly GOOGLE_ANALYTICS_MEASUREMENT_ID?: string;
  }
}
