import { usePresetAnimate } from '../usePresetAnimate';
import type { CardMeta } from '../useCardsState';
import type { CardPosition, DrawCardsOptions } from './types';

export function useDrawCards<Meta extends CardMeta>({
  cards,
  draweds,
  enabled,
  size,
  animate,
  getCardElements,
}: DrawCardsOptions<Meta>) {
  const $animate = usePresetAnimate(animate, { duration: 0.01 });

  const getPosition = (el: HTMLElement): CardPosition => {
    const { transform } = window.getComputedStyle(el);
    const matrix = new DOMMatrix(transform);

    return { x: matrix.e, y: matrix.f };
  };

  const getSlideOutPosition = (el: HTMLElement, { x, y }: CardPosition) => {
    const { transform } = window.getComputedStyle(el);
    const matrix = new DOMMatrix(transform);
    const rotate = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
    const rad = (rotate * Math.PI) / 180;
    const dist = size.height * 0.1;

    return {
      x: x + Math.sin(rad) * dist,
      y: y - Math.cos(rad) * dist,
    };
  };

  return {
    onDraw: async (el: HTMLElement) => {
      const elements = getCardElements();
      const selected = draweds.includes(cards[elements.indexOf(el)]);

      if (enabled && !selected) {
        const position = getPosition(el);

        el.dataset.position = JSON.stringify(position);
        await $animate(el, getSlideOutPosition(el, position));

        return true;
      } else if (selected) {
        const position = JSON.parse(el.dataset.position || '{}') as CardPosition;

        await $animate(el, position);
      }

      return false;
    },
  };
}
