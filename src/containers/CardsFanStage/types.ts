export interface CardsFanStageProps<Meta extends CardMeta> extends BaseStageProps<Meta> {
  onCardsDiscard?: (meta: Meta[]) => void;
}
