import type { CSSProperties } from 'react';
import type { Breakpoint } from '../GlobalStyle';

export interface BaseProps
  extends StyledCSSProperties<'alignItems' | 'justifyContent' | 'gap'> {
  $direction?: CSSProperties['flexDirection'];
  $width?: Breakpoint;
  $lineHeight?: number;
}

export type FlexProps = Omit<BaseProps, '$width'>;
