type SelectionClasses = Record<'drawn' | 'drawable', string>;

export interface DeckProps extends CardSize<'styled'> {
  $selector?: string;
  $selectionClasses?: SelectionClasses;
}
