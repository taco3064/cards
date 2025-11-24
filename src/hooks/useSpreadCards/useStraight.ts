import { getHorizontalOffsets, getVerticalOffsets, splitByCount } from './utils';
import { useBreakpointMatches } from '../useBreakpoint';
import { usePresetAnimate } from '../useCardsAnimate';
import type { UseSpreadAnimate } from './types';

const useStraight: UseSpreadAnimate = ({ size, animate }) => {
  const $animate = usePresetAnimate(animate, { duration: 0.1 });
  const { matched: maxCount } = useBreakpointMatches({ xs: 5, sm: 10, md: 15, lg: 25 });

  return async (elements) => {
    const rowList = splitByCount(elements, Math.min(elements.length, maxCount));
    const y = getVerticalOffsets(size, rowList.length);
    let index = 0;

    for (const rowEls of rowList) {
      const count = rowEls.length;
      const x = getHorizontalOffsets(size, count);

      for (let i = 0; i < count; i++) {
        await $animate(elements.slice(0, elements.length - index++), {
          x: x.start,
          y: y.start,
          rotate: 0,
        });

        x.start += x.distance;
      }

      y.start += y.distance;
    }
  };
};

export default useStraight;
