import { useBreakpointMatches } from '../useBreakpoint';
import { usePresetAnimate } from '../useCardsAnimate';
import type { CardMatrix, UseSpreadAnimate } from './types';

const useArchedRibbon: UseSpreadAnimate = ({ size, animate }) => {
  const $animate = usePresetAnimate(animate, { duration: 0.2 });
  const { matched: spreadDeg } = useBreakpointMatches({ xs: 20, sm: 45 });
  const { matched: radiusMultiplier } = useBreakpointMatches({ xs: 4, sm: 5, md: 6 });
  const displY = size.height * 0.3;

  return async (elements) => {
    // 先算出所有「目標攤開位置」，之後再一張一張把牌移過去
    const matrixes: CardMatrix[] = [];
    const spreadRad = (spreadDeg * Math.PI) / 180;
    const startY = -displY * 0.25;
    const radius = displY * radiusMultiplier; // 半徑：越大越彎，可以再調

    for (let i = 0; i < elements.length; i++) {
      const step = elements.length > 1 ? spreadRad / (elements.length - 1) : 0;
      const theta = -spreadRad / 2 + i * step;

      // 真正圓弧上的位置
      const x = Math.sin(theta) * radius;
      const y = startY - (Math.cos(theta) * radius - radius);

      // 卡片轉向：角度跟弧度對應，通常乘個係數會比較自然
      const rotate = ((theta * 180) / Math.PI) * 0.9;

      matrixes[i] = { x, y, rotate };
    }

    for (let i = 0; i < matrixes.length; i++) {
      await $animate(elements.slice(0, matrixes.length - i), matrixes[i]);
    }
  };
};

export default useArchedRibbon;
