import type { MouseEvent } from 'react';
import type { MotionNodeAnimationOptions } from 'motion/react';
import type { JsonObject } from 'type-fest';

export type CardMeta = JsonObject;

export type CardAnimationProps = Pick<
  MotionNodeAnimationOptions,
  'animate' | 'transition'
>;

export interface CardProps<Meta extends CardMeta = CardMeta> {
  animationProps?: CardAnimationProps;
  backImg: string;
  className?: string;
  meta: Meta;
  onClick?: (e: MouseEvent<HTMLDivElement>, meta: Meta) => void;

  classes?: {
    root?: string;
    front?: string;
    back?: string;
  };
}
