import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { type AnchorHTMLAttributes, type FC } from 'react';
import { isExternalLink } from '~/util/isExternalLink';

const MarkdownLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href = '/', children }) => {
  const externalLink = isExternalLink(href);

  return (
    <NextLink href={href} passHref>
      <MuiLink
        target={externalLink ? '_blank' : undefined}
        rel={externalLink ? 'noopener noreferrer' : undefined}
        sx={{ color: '#29b9f6' }}
      >
        {children}
        {externalLink && <OpenInNewIcon sx={{ fontSize: '1rem', marginLeft: '0.1rem', verticalAlign: 'middle' }} />}
      </MuiLink>
    </NextLink>
  );
};

export default MarkdownLink;
