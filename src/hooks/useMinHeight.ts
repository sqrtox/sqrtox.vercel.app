import { useViewportHeight } from '~/hooks/useViewportHeight';

const useMinHeight = (): string => {
  const vh = useViewportHeight();

  return (
    typeof vh === 'undefined'
      ? '100vh'
      : `${vh * 100}px`
  );
};

export { useMinHeight };
