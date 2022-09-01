import { type FC } from 'react';
import { minify } from 'uglify-js';
import { GOOGLE_ANALYTICS_MEASUREMENT_ID, existsMeasurementId } from '~/util/gtag';

const { code } = minify(`
'use strict';
{
  const dataLayer = window.dataLayer ||= [];
  const gtag = function () {
    dataLayer.push(arguments);
  };

  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', '${GOOGLE_ANALYTICS_MEASUREMENT_ID}');
}
`);

type GoogleAnalyticsProps = Readonly<{
  nonce?: string
}>;

const GoogleAnalytics: FC<GoogleAnalyticsProps> = ({ nonce }) => (
  <>
    {
      existsMeasurementId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
          />
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: code
            }}
          />
        </>
      )
    }
  </>
);

export default GoogleAnalytics;
export { type GoogleAnalyticsProps };
