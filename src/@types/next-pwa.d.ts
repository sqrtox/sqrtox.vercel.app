declare module 'next-pwa' {
  import { type NextConfig } from 'next';

  type NextPwaOptions = Readonly<Partial<{
    dest: string,
    /**
     * whether to disable pwa feature as a whole
     *
     * default: `false`
     *
     * set `disable: false`, so that it will generate service worker in both `dev` and `prod`
     *
     * set `disable: true` to completely disable PWA
     *
     * if you don't need to debug service worker in `dev`, you can set `disable: process.env.NODE_ENV === 'development'`
     */
    disable: boolean
  }>>;

  const withNextPwa: (config: NextConfig) => NextConfig;
  const nextPwa: (options: NextPwaOptions) => withNextPwa;

  export default nextPwa;
  export { type NextPwaOptions };
}
