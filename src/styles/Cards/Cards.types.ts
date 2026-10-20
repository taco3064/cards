type SelectionClasses = Record<'drawn' | 'drawable', string>;

export interface DeckProps {
  $position?: BaseStageProps<CardMeta>['position'];
  $selector?: string;
  $selectionClasses?: SelectionClasses;
  $size: CardSize;
}
