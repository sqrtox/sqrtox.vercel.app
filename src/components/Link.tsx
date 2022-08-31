import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { type FC, type ReactNode } from 'react';

type LinkProps = Readonly<{
  href: string,
  children: ReactNode,
  fontSize?: string,
  noReferrer?: boolean,
  noOpener?: boolean,
  external?: boolean,
  target?: '_blank'
}>;

const Link: FC<LinkProps> = ({
  href,
  children,
  fontSize,
  noOpener = false,
  noReferrer = false,
  external = false,
  target
}) => {
  const rel: string[] = [];

  if (external) {
    target = '_blank';
    noOpener = noReferrer = true;
  }

  if (noOpener) {
    rel.push('noopener');
  }

  if (noReferrer) {
    rel.push('noreferrer');
  }

  return (
    <NextLink
      href={href}
      passHref
    >
      <MuiLink
        fontSize={fontSize}
        target={target}
        rel={rel.join(' ')}
      >
        {children}
      </MuiLink>
    </NextLink>
  );
};

export default Link;
export { type LinkProps };
