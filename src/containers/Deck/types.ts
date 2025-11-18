import type { CardMeta, CardOptions } from '~app/hooks/useCardsState';
import type { CardProps } from '~app/components/Card';
import type { CardSize } from '~app/hooks/useCardsState';

type CardClasses = ExtendedClasses<'card', CardProps>;

export interface CardDeckProps extends CardSize<'styled'> {
  $cardClassName: string;
}

export interface DeckProps<Meta extends CardMeta> {
  cardOptions: Pick<CardProps, 'backImg' | 'size'> & CardOptions<Meta>;
  className?: string;
  classes?: Classes<'root' | 'deck' | 'status' | 'toolbar' | 'button'> & CardClasses;
  duration?: number;
}
