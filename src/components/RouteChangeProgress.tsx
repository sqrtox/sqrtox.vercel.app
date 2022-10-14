import { useRouter } from 'next/router';
import nprogress, { type NProgressOptions } from 'nprogress';
import { type FC, useEffect } from 'react';

type RouteChangeProgressProps = Readonly<Partial<{
  color: string,
  height: number,
  nonce: string,
  nprogressOptions: NProgressOptions,
  showOnShallow: boolean,
  startPosition: number,
  stopDelayMs: number,
  zIndex: number
}>>;

const RouteChangeProgress: FC<RouteChangeProgressProps> = ({
  stopDelayMs = 200,
  nprogressOptions,
  startPosition = 0.3,
  showOnShallow = true
}) => {
  const router = useRouter();
  let timer: NodeJS.Timer | undefined;

  const handleRouteChangeStart = (
    _eventName: string,
    { shallow }: Readonly<Record<'shallow', boolean>>
  ) => {
    if (!shallow || showOnShallow) {
      nprogress.set(startPosition);
      nprogress.start();
    }
  };

  const done = (shallow: boolean): void => {
    if (!shallow || showOnShallow) {
      if (typeof timer !== 'undefined') {
        clearTimeout(timer);
        timer = undefined;
      }

      timer = setTimeout(() => nprogress.done(), stopDelayMs);
    }
  };

  const handleRouteChangeComplete = (
    _eventName: string,
    { shallow }: Readonly<Record<'shallow', boolean>>
  ) => done(shallow);

  const handleRouteChangeError = (
    _err: Error,
    _url: string,
    { shallow }: Readonly<Record<'shallow', boolean>>
  ) => done(shallow);

  useEffect(() => {
    if (nprogressOptions) {
      nprogress.configure(nprogressOptions);
    }

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <></>
  );
};
export default RouteChangeProgress;
export { type RouteChangeProgressProps };
