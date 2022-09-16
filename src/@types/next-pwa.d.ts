declare module 'next-pwa' {
  import { type NextConfig } from 'next';

  type NextPwaConfig = Readonly<{
    dest: string,
    disable?: boolean
  }>;

  function configFactory(config: NextConfig): NextConfig;
  function nextPwa(config: NextPwaConfig): configFactory;

  export default nextPwa;
  export { type NextPwaConfig };
}
