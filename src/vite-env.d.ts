type CardMeta = import('type-fest').JsonObject & {
  id: string | number;
};

interface CardSize {
  width: number;
  height: number;
}

type StagePosition = Pick<
  import('react').CSSProperties,
  'top' | 'left' | 'right' | 'bottom' | 'zIndex'
>;

interface BaseStageProps<Meta> {
  backImg?: string;
  className?: string;
  cards: Meta[];
  position?: StagePosition;
  size: CardSize;

  onCardContentRender?: (card: Meta) => import('react').ReactNode;
  onCardImageRender?: (card: Meta) => string;
}
