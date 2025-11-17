import type { CardOptions } from '~app/hooks/useCardsState';
import type { CardProps } from '~app/components/Card';

export interface DeckProps {
  cardOptions: Pick<CardProps, 'backImg' | 'size'> & CardOptions;
  className?: string;
  duration?: number;
}
