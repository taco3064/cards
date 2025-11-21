type CardMeta = import('type-fest').JsonObject & {
  id: string | number;
};

type CardSize<Meta extends 'component' | 'styled'> = Meta extends 'component'
  ? Record<'width' | 'height', number>
  : Record<'$width' | '$height', number>;

interface BaseStageProps<CardData, CardMeta = CardData> {
  backImg?: string;
  className?: string;
  cards: CardData[];
  size: CardSize<'component'>;

  onCardContentRender?: (card: CardMeta) => import('react').ReactNode;
  onCardImageRender?: (card: CardMeta) => string;
}
