export function getHorizontalOffsets({ width }: CardSize, count: number) {
  const distance = width * 0.2;

  return {
    distance,
    start: ((count - 1) * distance) / -2,
  };
}

export function getVerticalOffsets({ height }: CardSize, rows = 1) {
  const distance = height * 0.3;

  return {
    distance,
    start: -distance * (rows / 4),
  };
}

export function splitByCount(elements: Readonly<HTMLElement[]>, count: number) {
  const total = elements.length;
  const rows = elements.length <= count ? 1 : Math.ceil(total / count);
  const result: HTMLElement[][] = [];

  for (let i = 0; i < rows; i++) {
    result.push(elements.slice(i * count, i * count + count));
  }

  return result;
}

export function splitByRows(elements: Readonly<HTMLElement[]>, rows: number) {
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
