type CardMeta = import('type-fest').JsonObject & {
  id: string | number;
};

type CardSize<Meta extends 'component' | 'styled'> = Meta extends 'component'
  ? Record<'width' | 'height', number>
  : Record<'$width' | '$height', number>;

interface BaseStageProps<Meta> {
  backImg?: string;
  className?: string;
  cards: Meta[];
  size: CardSize<'component'>;

  onCardContentRender?: (card: Meta) => import('react').ReactNode;
  onCardImageRender?: (card: Meta) => string;
}
