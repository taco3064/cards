import type { MouseEvent } from 'react';
import type { MotionNodeAnimationOptions } from 'motion/react';

import type { CardMeta, CardSize } from '~app/hooks/useCardsState';

export type CardAnimationProps = Pick<
  MotionNodeAnimationOptions,
  'animate' | 'transition'
>;

export interface CardProps<Meta extends CardMeta = CardMeta> {
  animationProps?: CardAnimationProps;
  backImg: string;
  className?: string;
  classes?: Classes<'root' | 'front' | 'back'>;
  meta: Meta;
  size: CardSize<'component'>;
  onClick?: (e: MouseEvent<HTMLDivElement>, meta: Meta) => void;
}
