import { useEffect, useEffectEvent, useState } from 'react';

import { useBreakpointMatches } from '../useBreakpoint';
import type { PreseteAnimate } from '../useCardsAnimate';
import type { SpreadMode, SpreadOptions, UseSpreadAnimate } from './SpreadCards.types';

export function useSpreadCards({ cardsRef, ...options }: SpreadOptions) {
  const [spreadMode, setSpreadMode] = useState<SpreadMode>();
  const [spreading, setSpreading] = useState(false);

  const animations = {
    HAND_FAN: useHandFan(options),
    ARCHED_RIBBON: useArchedRibbon(options),
    STRAIGHT: useStraight(options),
  };

  return {
    spreaded: Boolean(spreadMode),
    spreading,

    onSpreadReset: () => setSpreadMode(undefined),
    onSpread: async (mode = spreadMode) => {
      if (!mode) {
        return;
      }

      const animation = animations[mode];

      setSpreadMode(mode);
      setSpreading(true);
      await animation(cardsRef.current);
      setSpreading(false);
    },
  };
}

export function useAutoSpread(
  spreadMode: SpreadMode,
  onSpread: ReturnType<typeof useSpreadCards>['onSpread'],
) {
  const autoSpread = useEffectEvent((mode: SpreadMode) => onSpread(mode));

  useEffect(() => {
    if (spreadMode) {
      autoSpread(spreadMode);
    }
  }, [spreadMode]);
}

function getHorizontalOffsets({ width }: CardSize, count: number) {
  const distance = width * 0.2;

  return {
    distance,
    start: ((count - 1) * distance) / -2,
  };
}

function getVerticalOffsets({ height }: CardSize, rows = 1) {
  const distance = height * 0.3;

  return {
    distance,
    start: -distance * (rows / 4),
  };
}

function splitByCount(elements: Readonly<HTMLElement[]>, count: number) {
  const total = elements.length;
  const rows = elements.length <= count ? 1 : Math.ceil(total / count);
  const result: HTMLElement[][] = [];

  for (let i = 0; i < rows; i++) {
    result.push(elements.slice(i * count, i * count + count));
  }

  return result;
}

function splitByRows(elements: Readonly<HTMLElement[]>, rows: number) {
  const total = elements.length;
  const base = Math.floor(total / rows);
  const extra = total % rows; // 前 extra 份多分 1 個
  const result: HTMLElement[][] = [];

  for (let i = 0, start = 0; i < rows; i++) {
    const count = base + (rows - i <= extra ? 1 : 0);

    result.push(elements.slice(start, start + count));
    start += count;
  }

  return result;
}

const useArchedRibbon: UseSpreadAnimate = ({ size, animate }) => {
  const $animate: PreseteAnimate = (...args) => animate(...args, { duration: 0.01 });
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

const SPREAD_DEG = 10;
const RADIUS_MULTIPLIER = 2;

const useHandFan: UseSpreadAnimate = ({ size, animate }) => {
  const $animate: PreseteAnimate = (...args) => animate(...args, { duration: 0.1 });
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

const useStraight: UseSpreadAnimate = ({ size, animate }) => {
  const $animate: PreseteAnimate = (...args) => animate(...args, { duration: 0.1 });
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
