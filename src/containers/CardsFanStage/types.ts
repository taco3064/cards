import type { DrawnCard } from '~app/hooks/useDrawCards';

export interface CardsFanStageProps<Meta extends CardMeta>
  extends BaseStageProps<DrawnCard<Meta>, Meta> {
  onCardsDiscard?: (meta: Meta[]) => void;
}
