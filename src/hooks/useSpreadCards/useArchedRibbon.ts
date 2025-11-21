import { split } from './utils';
import { useBreakpointMatches } from '../useBreakpoint';
import { usePresetAnimate } from '../usePresetAnimate';
import type { CardMatrix, UseSpreadAnimate } from './types';

const useArchedRibbon: UseSpreadAnimate = ({ size, animate }) => {
  const $animate = usePresetAnimate(animate, { duration: 0.01 });
  const { matched: rows } = useBreakpointMatches({ xs: 6, sm: 4, md: 2, lg: 1 });
  const { matched: spreadDeg } = useBreakpointMatches({ xs: 20, sm: 45, md: 60 });
  const { matched: radiusMultiplier } = useBreakpointMatches({ xs: 4, sm: 5, md: 6 });
  const displY = size.height * 0.3;

  return async (elements) => {
    // 先算出所有「目標攤開位置」，之後再一張一張把牌移過去
    const poses: CardMatrix[] = [];

    let startY = -displY * (rows / 4);
    let slotIndex = 0;

    for (const rowEls of split(elements, rows)) {
      const count = rowEls.length;
      const spreadRad = (spreadDeg * Math.PI) / 180;
      const radius = displY * radiusMultiplier; // 半徑：越大越彎，可以再調

      const step = count > 1 ? spreadRad / (count - 1) : 0;
      const startAngle = -spreadRad / 2;

      for (let i = 0; i < count; i++) {
        const theta = startAngle + step * i;

        // 真正圓弧上的位置
        const x = Math.sin(theta) * radius;
        const y = startY - (Math.cos(theta) * radius - radius);

        // 卡片轉向：角度跟弧度對應，通常乘個係數會比較自然
        const rotate = ((theta * 180) / Math.PI) * 0.9;

        poses[slotIndex++] = { x, y, rotate };
      }

      startY += displY;
    }

    for (const pose of poses) {
      await $animate(elements, pose);
      elements.pop();
    }
  };
};

export default useArchedRibbon;
