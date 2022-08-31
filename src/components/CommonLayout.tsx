import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { type AppProps } from 'next/app';
import { type FC, useEffect, useRef, useState } from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Spacer from '~/components/Spacer';
import { useViewportHeight } from '~/hooks/useViewportHeight';

const CommonLayout: FC<AppProps> = ({ Component, pageProps }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    const elm = headerRef.current;

    if (!elm) {
      return;
    }

    const observer = new ResizeObserver(([{ contentRect: { height } }]) => {
      setHeaderHeight(height);
    });

    observer.observe(elm);

    return () => observer.unobserve(elm);
  });

  const viewportHeight = useViewportHeight();
  const minHeight = (
    typeof viewportHeight === 'undefined'
      ? '100vh'
      : `${viewportHeight * 100}px`
  );

  return (
    <Stack
      minHeight={minHeight}
      paddingTop={`${headerHeight}px`}
      sx={theme => ({
        [theme.breakpoints.down('sm')]: {
          paddingTop: '56px'
        }
      })}
    >
      <Header ref={headerRef} />
      <Box flex='1'>
        <Spacer>
          <Component {...pageProps} />
        </Spacer>
      </Box>
      <Footer />
    </Stack>
  );
};

export default CommonLayout;
