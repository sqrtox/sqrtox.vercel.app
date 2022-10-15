import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { existsMeasurementId, pageView } from '~/util/gtag';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const usePageView = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof location === 'undefined' || location.origin !== BASE_URL) {
      return;
    }

    if (!existsMeasurementId) {
      return;
    }

    const handleRouteChange = (path: string) => pageView(path);

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);
};

export { usePageView };
