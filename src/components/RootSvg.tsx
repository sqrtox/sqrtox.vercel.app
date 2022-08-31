import { type Theme, styled } from '@mui/material/styles';
import { type SxProps } from '@mui/system';
import { type Ref, type SVGProps } from 'react';

type RootSvgProps<P = unknown> = Omit<SVGProps<SVGSVGElement>, 'ref'> & Readonly<Partial<{
  sx: SxProps<Theme>,
  ref: Ref<SVGSVGElement>
}>> & P;

const RootSvg = styled('svg')({ verticalAlign: 'bottom' });

export default RootSvg;
export { type RootSvgProps };
