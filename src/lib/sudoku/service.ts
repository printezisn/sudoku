import type { Board } from './models';

export const createBoard = (): Board => ({
  cells: Array(81)
    .fill(null)
    .map(() => ({
      value: null,
      color: 0,
      hasError: false,
      initial: false,
      options: new Set(),
    })),
  finished: false,
  actions: [],
  currentColor: 0,
});

export const analyzeBoard = (board: Board) => {
  const valuesPerRow = Array(9)
    .fill(null)
    .map(() => Array(10).fill(0));
  const valuesPerCol = Array(9)
    .fill(null)
    .map(() => Array(10).fill(0));
  const valuesPerGroup = Array(9)
    .fill(null)
    .map(() => Array(10).fill(0));

  board.finished = true;

  for (let i = 0; i < board.cells.length; i++) {
    const value = board.cells[i].value;
    if (!value) continue;

    const row = Math.floor(i / 9);
    const col = i % 9;
    const group = Math.floor(row / 3) * 3 + Math.floor(col / 3);

    valuesPerRow[row][value]++;
    valuesPerCol[col][value]++;
    valuesPerGroup[group][value]++;
  }

  for (let i = 0; i < board.cells.length; i++) {
    const cell = board.cells[i];
    const value = cell.value;

    const row = Math.floor(i / 9);
    const col = i % 9;
    const group = Math.floor(row / 3) * 3 + Math.floor(col / 3);

    cell.options.clear();
    for (let option = 1; option <= 9; option++) {
      const limit = value === option ? 2 : 1;
      const available =
        valuesPerRow[row][option] < limit &&
        valuesPerCol[col][option] < limit &&
        valuesPerGroup[group][option] < limit;
      if (available) {
        cell.options.add(option);
      }
    }

    cell.hasError = value != null && !cell.options.has(value);
    if (cell.hasError || value == null) {
      board.finished = false;
    }
  }
};
