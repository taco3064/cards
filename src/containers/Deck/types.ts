import type { CardOptions } from '~app/hooks/useCardsState';
import type { CardProps } from '~app/components/Card';

type CardClasses = ExtendedClasses<'card', CardProps>;

export interface DeckProps {
  cardOptions: Pick<CardProps, 'backImg' | 'size'> & CardOptions;
  className?: string;
  classes?: Classes<'root' | 'deck' | 'status' | 'nav' | 'navItem'> & CardClasses;
  duration?: number;
}
