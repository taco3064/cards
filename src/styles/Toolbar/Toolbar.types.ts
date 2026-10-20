import type { CSSProperties } from 'react';
import type { Color } from '../Button';

type PositionVariant = NonNullable<CSSProperties['position']>;

export interface NavbarProps {
  $colors?: Color;
  $position?: Position & { variant: PositionVariant };
}
