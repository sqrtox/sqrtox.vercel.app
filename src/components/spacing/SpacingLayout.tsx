import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useSize from '@react-hook/size';
import { type FC, type ReactNode, useRef } from 'react';
import Spacer from '~/components/spacing/Spacer';
import SpacingLayoutFooter from '~/components/spacing/SpacingLayoutFooter';
import SpacingLayoutHeader from '~/components/spacing/SpacingLayoutHeader';
import { useMinHeight } from '~/hooks/useMinHeight';

type SpacingLayoutProps = Readonly<Partial<{
  children: ReactNode
}>>;

const SpacingLayout: FC<SpacingLayoutProps> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [, headerHeight] = useSize(headerRef, {
    initialWidth: 0,
    initialHeight: 64
  });
  const minHeight = useMinHeight();

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
      <SpacingLayoutHeader ref={headerRef} />
      <Box flex='1'>
        <Spacer>
          {children}
        </Spacer>
      </Box>
      <SpacingLayoutFooter />
    </Stack>
  );
};

export default SpacingLayout;
