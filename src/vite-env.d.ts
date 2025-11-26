declare module '*.md' {
  const content: string;
  export default content;
}

type CardMeta = import('type-fest').JsonObject & {
  id: string | number;
};

interface CardSize {
  width: number;
  height: number;
}

type StyledCSSProperties<T extends keyof import('react').CSSProperties> = {
  [K in T as `$${K}`]?: import('react').CSSProperties[K];
};

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
