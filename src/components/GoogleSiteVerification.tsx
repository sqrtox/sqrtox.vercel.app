import { type FC } from 'react';

const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const GoogleSiteVerification: FC = () => (
  <>
    {GOOGLE_SITE_VERIFICATION && <meta name='google-site-verification' content={GOOGLE_SITE_VERIFICATION} />}
  </>
);

export default GoogleSiteVerification;
