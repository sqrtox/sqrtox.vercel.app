import Box from '@mui/material/Box';
import { type FC, type ReactNode } from 'react';

type SpacerProps = Readonly<{
  children?: ReactNode
}>;

const Spacer: FC<SpacerProps> = ({ children }) => (
  <Box
    sx={({ breakpoints }) => ({
      width: '100%',
      marginInlineEnd: 'auto',
      marginInlineStart: 'auto',
      maxWidth: '50%',
      [breakpoints.down(1800)]: {
        maxWidth: '60%'
      },
      [breakpoints.down('lg')]: {
        maxWidth: '75%'
      },
      [breakpoints.down('sm')]: {
        maxWidth: '95%'
      }
    })}
  >
    {children}
  </Box>
);

export default Spacer;
export { type SpacerProps };