import { useState } from 'react';

import { createDrawn, getDrawn, getSlideOutPosition } from './utils';
import { usePresetAnimate } from '../useCardsAnimate';
import type { DrawnCard, DrawOptions } from './types';

export function useDrawCards<Meta extends CardMeta>({
  enabled,
  maxDrawnCount,
  size,
  animate,
}: DrawOptions) {
  const $animate = usePresetAnimate(animate, { duration: 0.01 });
  const [drawns, setDrawns] = useState<DrawnCard<Meta>[]>([]);

  return {
    drawable: enabled && drawns.length < maxDrawnCount,
    drawns,

    isDrawn: (card: Meta) => Boolean(getDrawn(drawns, card)),
    onDrawReset: () => setDrawns([]),
    onDraw: async (options?: Pick<DrawnCard<Meta>, 'card' | 'element'>) => {
      if (!options) {
        const result: DrawnCard<Meta>[] = drawns.map(createDrawn);

        await Promise.allSettled(
          result.map((drawn) =>
            $animate(drawn.element, getSlideOutPosition(size, drawn)),
          ),
        );

        return setDrawns(result);
      }

      const { card, element } = options;
      const drawn = getDrawn(drawns, card);
      const drawable = enabled && drawns.length < maxDrawnCount;

      if (drawable && !drawn) {
        const newDrawn = createDrawn({ card, element });

        setDrawns([...drawns, newDrawn]);
        await $animate(element, getSlideOutPosition(size, newDrawn));
      } else if (drawn) {
        setDrawns(drawns.filter((d) => d !== drawn));
        await $animate(element, drawn.position);
      }
    },
  };
}
