import { useState } from 'react';

import { usePresetAnimate } from '../usePresetAnimate';
import type { CardMeta } from '../useCardsState';
import type { CardPosition, DrawnCard, DrawCardsOptions } from './types';

export function useDrawCards<Meta extends CardMeta>({
  enabled,
  maxDrawnCount,
  size,
  animate,
}: DrawCardsOptions<Meta>) {
  const $animate = usePresetAnimate(animate, { duration: 0.01 });
  const { getDrawn, getPosition, getSlideOutPosition } = useCardPosition(size);
  const [drawns, setDrawns] = useState<DrawnCard<Meta>[]>([]);

  return {
    drawable: enabled && drawns.length < maxDrawnCount,
    drawns,

    isDrawn: (card: Meta) => Boolean(getDrawn(drawns, card)),
    onDrawReset: () => setDrawns([]),
    onDraw: async (element: HTMLElement, card: Meta) => {
      const drawn = getDrawn(drawns, card);
      const drawable = enabled && drawns.length < maxDrawnCount;

      if (drawable && !drawn) {
        const position = getPosition(element);

        setDrawns([...drawns, { card, element, position }]);
        await $animate(element, getSlideOutPosition(element, position));
      } else if (drawn) {
        setDrawns(drawns.filter((d) => d !== drawn));
        await $animate(element, drawn.position);
      }
    },
  };
}

function useCardPosition<Meta extends CardMeta>(size: CardSize<'component'>) {
  return {
    getDrawn(drawns: DrawnCard<Meta>[], card: Meta) {
      return drawns.find((drawn) => drawn.card === card);
    },
    getPosition(el: HTMLElement): CardPosition {
      const { transform } = window.getComputedStyle(el);
      const matrix = new DOMMatrix(transform);

      return { x: matrix.e, y: matrix.f };
    },
    getSlideOutPosition(el: HTMLElement, { x, y }: CardPosition): CardPosition {
      const { transform } = window.getComputedStyle(el);
      const matrix = new DOMMatrix(transform);
      const rotate = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
      const rad = (rotate * Math.PI) / 180;
      const dist = size.height * 0.1;

      return {
        x: x + Math.sin(rad) * dist,
        y: y - Math.cos(rad) * dist,
      };
    },
  };
}
