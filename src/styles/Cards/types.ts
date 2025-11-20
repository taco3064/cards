type SelectionClasses = Record<'selected' | 'selectable', string>;

export interface DeckProps extends CardSize<'styled'> {
  $selector?: string;
  $selectionClasses?: SelectionClasses;
}
