import type { ReactNode } from 'react';
import type { SetRequired } from 'type-fest';

import type { CardMeta, CardSize, CardsState } from '~app/hooks/useCardsState';
import type { CardProps } from '~app/components/Card';

export interface CardDeckProps extends CardSize<'styled'> {
  $cardClassName: string;
}

export interface DeckToolbarProps<Meta extends CardMeta>
  extends Pick<CardProps<Meta>, 'size'>,
    Pick<
      CardsState<Meta>,
      'animate' | 'cards' | 'getCardElements' | 'onCardsChange' | 'onCardsReset'
    > {
  duration: number;
}

export interface DeckStageProps<Meta extends CardMeta>
  extends SetRequired<
    Partial<Pick<DeckToolbarProps<Meta>, 'duration' | 'size'>>,
    'size'
  > {
  backImg?: string;
  className?: string;
  defaultCards: Meta[];

  onCardClick?: CardProps<Meta>['onClick'];
  onCardContentRender?: (meta: Meta) => ReactNode;
  onCardImageRender?: (meta: Meta) => string;
}
