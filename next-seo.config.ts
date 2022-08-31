import { type DefaultSeoProps } from 'next-seo';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;
const SITE_SHORT_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_SHORT_DESCRIPTION;

const defaultSeoProps: DefaultSeoProps = {
  defaultTitle: `${SITE_NAME} - ${SITE_SHORT_DESCRIPTION}`,
  description: SITE_DESCRIPTION,
  titleTemplate: (
    typeof SITE_NAME === 'undefined'
      ? '%s'
      : `%s | ${SITE_NAME}`
  )
};

export default defaultSeoProps;
