import type { ReactElement } from 'react';
import type { IconBaseProps } from '../Icon';

export type Color = {
  [K in 'bg' | 'text' | 'border']?: string;
};

export interface BaseProps {
  $colors?: Color;
}

export interface IconProps {
  $margin?: string;
  children: ReactElement<IconBaseProps>;
}

export interface NavLinkProps {
  $colors?: Color;
  $fontSize?: number;
}
