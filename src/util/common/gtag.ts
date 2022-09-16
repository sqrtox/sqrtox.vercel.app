const GOOGLE_ANALYTICS_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID;

const existsMeasurementId = typeof GOOGLE_ANALYTICS_MEASUREMENT_ID === 'string';

const pageView = (path: string): void => {
  if (!existsMeasurementId) {
    return;
  }

  window.gtag('config', GOOGLE_ANALYTICS_MEASUREMENT_ID, {
    page_path: path
  });
};

export {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  existsMeasurementId,
  pageView
};
