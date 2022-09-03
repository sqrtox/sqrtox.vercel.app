declare module 'next-pwa' {
  import { type NextConfig } from 'next';

  interface NextPwaConfig {
    disable?: boolean;
    dest: string;
  }

  function configFactory(config: NextConfig): NextConfig;
  function nextPwa(config: NextPwaConfig): configFactory;

  export default nextPwa;
  export { type NextPwaConfig };
}
