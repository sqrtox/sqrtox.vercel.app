import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { type FC, type ReactNode } from 'react';

type LinkProps = Readonly<{
  href: string,
  children: ReactNode,
  fontSize?: string,
  color?: string,
  underline?: 'none' | 'hover' | 'always',
  noReferrer?: boolean,
  noOpener?: boolean,
  external?: boolean,
  target?: '_blank'
}>;

const Link: FC<LinkProps> = ({
  href,
  children,
  fontSize,
  color,
  underline,
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
        color={color}
        underline={underline}
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
