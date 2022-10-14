import Box from '@mui/material/Box';
import { type FC, type ReactNode } from 'react';

type SpacerProps = Readonly<Partial<{
  children: ReactNode
}>>;

const Spacer: FC<SpacerProps> = ({ children }) => (
  <Box
    sx={({ breakpoints }) => ({
      marginInlineEnd: 'auto',
      marginInlineStart: 'auto',
      maxWidth: '50%',
      width: '100%',
      [breakpoints.down(1800)]: {
        maxWidth: '60%'
      },
      [breakpoints.down('lg')]: {
        maxWidth: '75%'
      },
      [breakpoints.down('md')]: {
        maxWidth: '90%'
      }
    })}
  >
    {children}
  </Box>
);

export default Spacer;
export { type SpacerProps };
