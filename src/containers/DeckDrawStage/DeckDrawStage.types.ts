import type { CardsRef, PreseteAnimate } from '~app/hooks/useCardsAnimate';
import type { DrawnCard } from '~app/hooks/useDrawCards';

export interface DeckDrawStageProps<Meta extends CardMeta> extends BaseStageProps<Meta> {
  completed?: boolean;
  maxDrawnCount: number;
  onCardsChange: (cards: Meta[]) => void;
  onComplete: (deck: Meta[], drawns: Meta[]) => void;
  onReset: () => void;
}

export interface ResetOptions {
  cardsRef: CardsRef;
  animate: PreseteAnimate;
  resetHandlers: (() => void)[];
}

export interface CompleteOptions<Meta extends CardMeta>
  extends Pick<DeckDrawStageProps<Meta>, 'onComplete'> {
  cards: Meta[];
  cardsRef: CardsRef;
  selecteds: DrawnCard<Meta>[];
  animate: PreseteAnimate;
  onSpreadReset: () => void;
}
