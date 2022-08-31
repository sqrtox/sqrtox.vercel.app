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
        color='primary'
      >
        {children}
        {externalLink && <OpenInNewIcon sx={{ marginLeft: '0.1rem', verticalAlign: 'middle', fontSize: '1rem' }} />}
      </MuiLink>
    </NextLink>
  );
};

export default MarkdownLink;