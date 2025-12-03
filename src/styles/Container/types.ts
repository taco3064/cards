import type { CSSProperties } from 'react';

export type ContainerWidth = Exclude<Breakpoint, 'xl'>;

export interface BaseProps
  extends StyledCSSProperties<'alignItems' | 'justifyContent' | 'gap'> {
  $direction?: CSSProperties['flexDirection'];
  $width?: ContainerWidth;
  $lineHeight?: number;
}

export type FlexProps = Omit<BaseProps, '$width'>;
