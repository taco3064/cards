import { getVerticalOffsets, splitByCount } from './utils';
import { useBreakpointMatches } from '../useBreakpoint';
import { usePresetAnimate } from '../useCardsAnimate';
import type { UseSpreadAnimate } from './types';

const SPREAD_DEG = 10;
const RADIUS_MULTIPLIER = 2;

const useHandFan: UseSpreadAnimate = ({ size, animate }) => {
  const $animate = usePresetAnimate(animate, { duration: 0.1 });
  const { matched: maxCount } = useBreakpointMatches({ xs: 8, sm: 13 });

  return async (elements) => {
    const rowList = splitByCount(elements, Math.min(elements.length, maxCount));
    const y = getVerticalOffsets(size, rowList.length);
    let index = 0;

    for (const rowEls of rowList) {
      const count = rowEls.length;
      const spreadRad = (SPREAD_DEG * Math.PI) / 180;
      const radius = y.distance * RADIUS_MULTIPLIER; // 半徑：越大越彎，可以再調
      const startAngle = -spreadRad * ((count - 1) / 2);

      for (let i = 0; i < count; i++) {
        const theta = startAngle + i * spreadRad;

        await $animate(elements.slice(0, elements.length - index++), {
          x: Math.sin(theta) * radius,
          y: y.start - (Math.cos(theta) * radius - radius),
          rotate: ((theta * 180) / Math.PI) * 0.9,
        });
      }

      y.start += y.distance;
    }
  };
};

export default useHandFan;
