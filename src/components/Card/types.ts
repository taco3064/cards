import type { MouseEvent, ReactNode } from 'react';
import type { MotionNodeAnimationOptions } from 'motion/react';

import type { CardMeta, CardSize } from '~app/hooks/useCardsState';

export type CardAnimationProps = Pick<
  MotionNodeAnimationOptions,
  'animate' | 'transition'
>;

export interface CardProps<Meta extends CardMeta = CardMeta> {
  animationProps?: CardAnimationProps;
  children?: ReactNode;
  className?: string;
  imgs: Partial<Record<'front' | 'back', string>>;
  meta: Meta;
  size: CardSize<'component'>;
  onClick?: (meta: Meta, e: MouseEvent<HTMLDivElement>) => void;
}
