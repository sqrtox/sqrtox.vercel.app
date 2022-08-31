import { useEffect, useState } from 'react';

const useViewportHeight = (): number | undefined => {
  const [viewportHeight, setViewportHeight] = useState<number | undefined>();
  const handleResize = () => {
    setViewportHeight(window.innerHeight * 0.01);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  return viewportHeight;
};

export { useViewportHeight };
