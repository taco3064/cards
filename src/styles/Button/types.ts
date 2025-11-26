import type { ReactElement } from 'react';
import type { IconBaseProps } from '../Icon';

export type Color = {
  [K in 'bg' | 'text' | 'border']?: string;
};

export interface IconButtonProps {
  $margin?: string;
  children: ReactElement<IconBaseProps>;
}
