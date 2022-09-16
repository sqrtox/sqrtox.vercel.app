import { type FC } from 'react';
import { minify } from 'uglify-js';
import { GOOGLE_ANALYTICS_MEASUREMENT_ID, existsMeasurementId } from '~/util/common/gtag';

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

const GoogleAnalytics: FC = () => (
  <>
    {
      existsMeasurementId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
          />
          <script
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
