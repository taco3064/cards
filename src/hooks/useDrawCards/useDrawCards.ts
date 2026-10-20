import { useEffect, useEffectEvent, useState } from 'react';

import type { PreseteAnimate } from '../useCardsAnimate';
import type { CardPosition, DrawnCard, DrawOptions } from './DrawCards.types';

export function useDrawCards<Meta extends CardMeta>({
  cards,
  enabled,
  maxDrawnCount,
  size,
  animate,
}: DrawOptions<Meta>) {
  const $animate: PreseteAnimate = (...args) => animate(...args, { duration: 0.01 });
  const [selecteds, setSelecteds] = useState<DrawnCard<Meta>[]>([]);

  return {
    drawable: enabled && selecteds.length < maxDrawnCount,
    selecteds,

    isDrawn: (card: Meta) => Boolean(getSelected(selecteds, card)),
    onDrawReset: useReset(cards, () => setSelecteds([])),
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

function useReset<Meta extends CardMeta>(cards: Meta[], onReset: () => void) {
  const reset = useEffectEvent(onReset);

  useEffect(() => {
    reset();
  }, [cards]);

  return onReset;
}

function createDrawn<Meta extends CardMeta>({
  card,
  element,
}: Pick<DrawnCard<Meta>, 'card' | 'element'>): DrawnCard<Meta> {
  return { card, element, position: getPosition(element) };
}

function getSelected<Meta extends CardMeta>(
  selecteds: DrawnCard<Meta>[],
  card: Meta,
) {
  return selecteds.find((selected) => selected.card === card);
}

function getPosition(el: HTMLElement): CardPosition {
  const { transform } = window.getComputedStyle(el);
  const matrix = new DOMMatrix(transform);

  return { x: matrix.e, y: matrix.f };
}

function getSlideOutPosition<Meta extends CardMeta>(
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
