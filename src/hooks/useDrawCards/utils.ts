import type { CardPosition, DrawnCard } from './types';

export function createDrawn<Meta extends CardMeta>({
  card,
  element,
}: Pick<DrawnCard<Meta>, 'card' | 'element'>): DrawnCard<Meta> {
  return { card, element, position: getPosition(element) };
}

export function getSelected<Meta extends CardMeta>(
  selecteds: DrawnCard<Meta>[],
  card: Meta,
) {
  return selecteds.find((selected) => selected.card === card);
}

export function getPosition(el: HTMLElement): CardPosition {
  const { transform } = window.getComputedStyle(el);
  const matrix = new DOMMatrix(transform);

  return { x: matrix.e, y: matrix.f };
}

export function getSlideOutPosition<Meta extends CardMeta>(
  size: CardSize,
  { element, position }: Pick<DrawnCard<Meta>, 'element' | 'position'>,
): CardPosition {
  const { transform } = window.getComputedStyle(element);
  const matrix = new DOMMatrix(transform);
  const rotate = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
  const rad = (rotate * Math.PI) / 180;
  const dist = size.height * 0.1;

  return {
    x: position.x + Math.sin(rad) * dist,
    y: position.y - Math.cos(rad) * dist,
  };
}
