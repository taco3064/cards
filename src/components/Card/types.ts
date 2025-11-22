import type { ComponentProps, MouseEvent, ReactNode } from 'react';
import { motion } from 'motion/react';

export type CardAnimationProps = Pick<
  ComponentProps<typeof motion.div>,
  'animate' | 'initial' | 'transition'
>;

export interface CardProps<Meta extends CardMeta = CardMeta> {
  animationProps?: CardAnimationProps;
  children?: ReactNode;
  className?: string;
  imgs: Partial<Record<'front' | 'back', string>>;
  meta: Meta;
  revealed?: boolean;
  size: CardSize;
  onClick?: (e: MouseEvent<HTMLDivElement>, meta: Meta) => void;
}
