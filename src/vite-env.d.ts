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

type Position = Pick<
  import('react').CSSProperties,
  'top' | 'left' | 'right' | 'bottom' | 'zIndex'
>;

type StyledProps<
  T extends Record<string, import('react').ComponentType>,
  K extends keyof T,
> = import('react').ComponentProps<T[K]>;

interface BaseStageProps<Meta> {
  backImg?: string;
  className?: string;
  cards: Meta[];
  position?: Position;
  size: CardSize;

  onCardContentRender?: (card: Meta) => import('react').ReactNode;
  onCardImageRender?: (card: Meta) => string;
}
