import type { CardOptions } from '~app/hooks/useCardsState';
import type { CardProps } from '~app/components/Card';
import type { CardSize } from '~app/hooks/useCardsState';

type CardClasses = ExtendedClasses<'card', CardProps>;

export interface CardDeckProps extends CardSize<'styled'> {
  $cardClassName: string;
}

export interface DeckProps {
  cardOptions: Pick<CardProps, 'backImg' | 'size'> & CardOptions;
  className?: string;
  classes?: Classes<'root' | 'deck' | 'status' | 'toolbar' | 'button'> & CardClasses;
  duration?: number;
}
