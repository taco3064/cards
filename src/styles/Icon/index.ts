import type { ComponentProps } from 'react';
import Icon from './Icon.styles';

export default Icon;

export type IconBaseProps = Omit<
  ComponentProps<typeof Icon.Base>,
  'children' | 'viewBox'
>;
