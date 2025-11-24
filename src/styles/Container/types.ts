import type { CSSProperties } from 'react';

export interface FlexProps
  extends StyledCSSProperties<'alignItems' | 'justifyContent' | 'gap'> {
  $direction?: CSSProperties['flexDirection'];
}
