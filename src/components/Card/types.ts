import type { MouseEvent } from 'react';
import type { MotionNodeAnimationOptions } from 'motion/react';

import type { CardMeta } from '~app/hooks/useCardsState';
import type { CardSize } from '~app/hooks/useShuffleCards';

export type CardAnimationProps = Pick<
  MotionNodeAnimationOptions,
  'animate' | 'transition'
>;

export interface CardProps<Meta extends CardMeta = CardMeta> {
  animationProps?: CardAnimationProps;
  backImg: string;
  className?: string;
  meta: Meta;
  size: CardSize<'component'>;
  onClick?: (e: MouseEvent<HTMLDivElement>, meta: Meta) => void;

  classes?: {
    root?: string;
    front?: string;
    back?: string;
  };
}
