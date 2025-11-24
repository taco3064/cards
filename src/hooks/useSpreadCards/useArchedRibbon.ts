import { getVerticalOffsets, splitByRows } from './utils';
import { useBreakpointMatches } from '../useBreakpoint';
import { usePresetAnimate } from '../useCardsAnimate';
import type { UseSpreadAnimate } from './types';

const useArchedRibbon: UseSpreadAnimate = ({ size, animate }) => {
  const $animate = usePresetAnimate(animate, { duration: 0.01 });
  const { matched: rows } = useBreakpointMatches({ xs: 6, sm: 4, md: 2, lg: 1 });
  const { matched: spreadDeg } = useBreakpointMatches({ xs: 20, sm: 45, md: 60 });
  const { matched: radiusMultiplier } = useBreakpointMatches({ xs: 4, md: 8, lg: 12 });

  return async (elements) => {
    const rowList = splitByRows(elements, rows);
    const y = getVerticalOffsets(size, rowList.length);
    let index = 0;

    for (const rowEls of rowList) {
      const count = rowEls.length;
      const spreadRad = (spreadDeg * Math.PI) / 180;
      const radius = y.distance * radiusMultiplier; // 半徑：越大越彎，可以再調
      const step = count > 1 ? spreadRad / (count - 1) : 0;
      const startAngle = -spreadRad / 2;

      for (let i = 0; i < count; i++) {
        const theta = startAngle + step * i;

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

export default useArchedRibbon;
