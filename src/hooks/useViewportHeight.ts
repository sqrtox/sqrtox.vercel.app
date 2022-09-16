import { useEffect, useState } from 'react';

const useViewportHeight = (): number | undefined => {
  const [vh, setVh] = useState<number | undefined>();
  const handleResize = () => setVh(window.innerHeight * 0.01);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  return vh;
};

export { useViewportHeight };
