import { type Theme, styled } from '@mui/material/styles';
import { type SxProps } from '@mui/system';
import { type Ref, type SVGProps } from 'react';

type RootSvgProps<P = unknown> = Omit<SVGProps<SVGSVGElement>, 'ref'> & P & Readonly<Partial<{
  sx: SxProps<Theme>,
  ref: Ref<SVGSVGElement>
}>>;

const RootSvg = styled('svg')({ verticalAlign: 'bottom' });

export default RootSvg;
export { type RootSvgProps };
