import type { ReactNode } from 'react';

import type { CardMeta, CardSize } from '~app/hooks/useCardsState';
import type { CardProps } from '~app/components/Card';
import type { useShuffleCards } from '~app/hooks/useShuffleCards';
import type { useSpreadCards } from '~app/hooks/useSpreadCards';

export type ToolbarStatus = 'shuffling' | 'spreading' | 'spreaded';

export interface CardDeckProps extends CardSize<'styled'> {
  $cardClassName: string;
}

export interface DeckToolbarProps<Meta extends CardMeta> {
  className?: string;
  status?: ToolbarStatus;
  onReset: () => void;
  onShuffle: ReturnType<typeof useShuffleCards<Meta>>['onShuffle'];
  onSpread: ReturnType<typeof useSpreadCards<Meta>>['onSpread'];
}

export interface DeckStageProps<Meta extends CardMeta>
  extends Pick<CardProps<Meta>, 'size'> {
  backImg?: string;
  className?: string;
  defaultCards: Meta[];

  onCardClick?: CardProps<Meta>['onClick'];
  onCardContentRender?: (meta: Meta) => ReactNode;
  onCardImageRender?: (meta: Meta) => string;
}
