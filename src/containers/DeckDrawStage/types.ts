import type { ReactNode } from 'react';

import type { CardMeta } from '~app/hooks/useCardsState';
import type { CardProps } from '~app/components/Card';
import type { useShuffleCards } from '~app/hooks/useShuffleCards';
import type { useSpreadCards } from '~app/hooks/useSpreadCards';

export interface CardDeckProps extends CardSize<'styled'> {
  $cardClassName: string;
}

export interface DeckToolbarProps<Meta extends CardMeta> {
  className?: string;
  status: Record<'shuffling' | 'spreading' | 'spreaded', boolean>;
  onReset: () => void;
  onShuffle: ReturnType<typeof useShuffleCards<Meta>>['onShuffle'];
  onSpread: ReturnType<typeof useSpreadCards<Meta>>['onSpread'];
}

export interface DeckDrawStageProps<Meta extends CardMeta>
  extends Pick<CardProps<Meta>, 'size'> {
  backImg?: string;
  className?: string;
  defaultCards: Meta[];
  maxDrawCount: number;

  onCardContentRender?: (meta: Meta) => ReactNode;
  onCardImageRender?: (meta: Meta) => string;
}
