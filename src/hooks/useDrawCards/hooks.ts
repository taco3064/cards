import { useState } from 'react';

import { createDrawn, getSelected, getSlideOutPosition } from './utils';
import { usePresetAnimate } from '../useCardsAnimate';
import type { DrawnCard, DrawOptions } from './types';

export function useDrawCards<Meta extends CardMeta>({
  enabled,
  maxDrawnCount,
  size,
  animate,
}: DrawOptions) {
  const $animate = usePresetAnimate(animate, { duration: 0.01 });
  const [selecteds, setSelecteds] = useState<DrawnCard<Meta>[]>([]);

  return {
    drawable: enabled && selecteds.length < maxDrawnCount,
    selecteds,

    isDrawn: (card: Meta) => Boolean(getSelected(selecteds, card)),
    onDrawReset: () => setSelecteds([]),
    onDraw: async (options?: Pick<DrawnCard<Meta>, 'card' | 'element'>) => {
      if (!options) {
        const result: DrawnCard<Meta>[] = selecteds.map(createDrawn);

        await Promise.allSettled(
          result.map((drawn) =>
            $animate(drawn.element, getSlideOutPosition(size, drawn)),
          ),
        );

        return setSelecteds(result);
      }

      const { card, element } = options;
      const selected = getSelected(selecteds, card);
      const drawable = enabled && selecteds.length < maxDrawnCount;

      if (drawable && !selected) {
        const newDrawn = createDrawn({ card, element });

        setSelecteds([...selecteds, newDrawn]);
        await $animate(element, getSlideOutPosition(size, newDrawn));
      } else if (selected) {
        setSelecteds(selecteds.filter((s) => s !== selected));
        await $animate(element, selected.position);
      }
    },
  };
}
