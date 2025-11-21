export function split(elements: Readonly<HTMLElement[]>, rows: number) {
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
