import Script from 'next/script';
import { type FC } from 'react';

const commonProps = {
  crossOrigin: 'anonymous',
  href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
  integrity: 'sha512-h7nl+xz8wgDlNM4NqKEM4F1NkIRS17M9+uJwIGwuo8vGqIl4BhuCKdxjWEINm+xyrUjNCnK5dCrhM0sj+wTIXw==',
  referrerPolicy: 'no-referrer',
  rel: 'stylesheet'
} as const;

const KatexStyleSheetLoader: FC = () => {
  const isClientSide = typeof window !== 'undefined';

  return (
    <>
      {isClientSide && (
        <Script async id='katex-stylesheet-loader'>
          {`
          'use strict';
          {
            const link = document.createElement('link');

            link.rel = 'stylesheet';
            link.crossOrigin = 'anonymous';
            link.integrity = 'sha512-h7nl+xz8wgDlNM4NqKEM4F1NkIRS17M9+uJwIGwuo8vGqIl4BhuCKdxjWEINm+xyrUjNCnK5dCrhM0sj+wTIXw==';
            link.referrerPolicy = 'no-referrer';
            link.href = 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css';

            document.head.append(link);
          }
          `}
        </Script>
      )}
      <noscript>
        <link {...commonProps} />
      </noscript>
    </>
  );
};

export default KatexStyleSheetLoader;
