//@ts-check

const isDev = process.env.NODE_ENV === 'development';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  headers: async () => ([
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cross-Origin-Embedder-Policy',
          value: 'require-corp'
        },
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin'
        },
        {
          key: 'Cross-Origin-Resource-Policy',
          value: 'same-origin'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'no-referrer'
        },
        {
          key: 'Permissions-Policy',
          value: (
            'accelerometer=(), ' +
            'autoplay=(), ' +
            'camera=(), ' +
            'cross-origin-isolated=(), ' +
            'display-capture=(), ' +
            'document-domain=(), ' +
            'encrypted-media=(), ' +
            'fullscreen=(), ' +
            'geolocation=(), ' +
            'gyroscope=(), ' +
            'keyboard-map=(), ' +
            'magnetometer=(), ' +
            'microphone=(), ' +
            'midi=(), ' +
            'payment=(), ' +
            'picture-in-picture=(), ' +
            'publickey-credentials-get=(), ' +
            'screen-wake-lock=(), ' +
            'sync-xhr=(), ' +
            'usb=(), ' +
            'web-share=(), ' +
            'xr-spatial-tracking=(), ' +
            'clipboard-read=(), ' +
            'clipboard-write=(), ' +
            'gamepad=(), ' +
            'hid=(), ' +
            'idle-detection=(), ' +
            'interest-cohort=(), ' +
            'serial=(), ' +
            'trust-token-redemption=(), ' +
            'window-placement=()'
          )
        },
        {
          key: 'Content-Security-Policy',
          value: (
            isDev ? (
              'default-src \'self\' \'unsafe-eval\'; ' +
              'font-src https://fonts.gstatic.com https://cdn.jsdelivr.net; ' +
              'style-src \'unsafe-inline\' https://fonts.googleapis.com https://cdn.jsdelivr.net; ' +
              'style-src-elem \'unsafe-inline\' https://fonts.googleapis.com https://cdn.jsdelivr.net'
            ) : (
              'default-src \'self\'; ' +
              'connect-src \'self\' https://www.google-analytics.com; ' +
              'font-src https://cdn.jsdelivr.net https://fonts.gstatic.com; ' +
              'style-src \'unsafe-inline\' \'self\' https://cdn.jsdelivr.net; ' +
              'style-src-elem \'unsafe-inline\' \'self\' https://cdn.jsdelivr.net; ' +
              'script-src \'unsafe-inline\' \'self\' https://www.googletagmanager.com; ' +
              'script-src-elem \'unsafe-inline\' \'self\' https://www.googletagmanager.com'
            )
          )
        }
      ]
    }
  ])
};

export default nextConfig;
