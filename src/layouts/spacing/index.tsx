import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useSize from '@react-hook/size';
import { type FC, type ReactNode, useRef } from 'react';
import Spacer from '~/components/Spacer';
import { useMinHeight } from '~/hooks/useMinHeight';
import SpacingLayoutFooter from '~/layouts/spacing/SpacingLayoutFooter';
import SpacingLayoutHeader from '~/layouts/spacing/SpacingLayoutHeader';

type SpacingLayoutProps = Readonly<Partial<{
  children: ReactNode
}>>;

const SpacingLayout: FC<SpacingLayoutProps> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [, headerHeight] = useSize(headerRef, {
    initialHeight: 64,
    initialWidth: 0
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
