export interface SplitResult {
  value: string;
  start: number;
  end: number;
  next: number;
}

export const splitString = function* (
  input: string,
  separator: string,
  startIndex = 0,
): Generator<SplitResult> {
  if (separator.length === 0) {
    return;
  }
  let start = startIndex;
  const { length } = input;
  while (start <= length) {
    let end = input.indexOf(separator, start);
    if (end < 0) {
      end = length;
    }
    const next = end + separator.length;
    yield {
      value: input.slice(start, end),
      start,
      end,
      next,
    };
    start = next;
  }
};
