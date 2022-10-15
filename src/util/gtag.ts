import { loadScript } from '~/util/loadScript';

const GOOGLE_ANALYTICS_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID;

const existsMeasurementId = typeof GOOGLE_ANALYTICS_MEASUREMENT_ID === 'string';

const loadGtagScript = async () => {
  await loadScript({
    src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`,
    type: 'external'
  });
  await loadScript({
    id: 'gtag',
    src: `
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
    `,
    type: 'inline'
  });
};

const pageView = async (path: string): Promise<void> => {
  if (!existsMeasurementId) {
    return;
  }

  const fire = () => {
    window.gtag('config', GOOGLE_ANALYTICS_MEASUREMENT_ID, {
      page_path: path
    });
  };

  if (!document.getElementById('gtag')) {
    await loadGtagScript();
  }

  fire();
};

export {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  existsMeasurementId,
  loadGtagScript,
  pageView
};
