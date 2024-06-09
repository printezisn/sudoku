import { Action, ActionType, Board } from './models';

const COLOR_LIMIT = 5;

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

export const cloneBoard = (board: Board): Board => ({
  ...board,
  actions: board.actions.map((action) => ({ ...action })),
  cells: board.cells.map((cell) => ({
    ...cell,
    options: new Set(cell.options),
  })),
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

export const changeColor = (board: Board) => {
  const newColor = (board.currentColor + 1) % COLOR_LIMIT;

  board.actions.push({
    cellIndex: null,
    from: board.currentColor,
    to: newColor,
    type: ActionType.COLOR_CHANGE,
  });
  board.currentColor = newColor;
};

export const setCellValue = (
  board: Board,
  cellIndex: number,
  value: number | null
) => {
  board.cells[cellIndex].value = value;
  board.cells[cellIndex].color = board.currentColor;

  analyzeBoard(board);
};

const undoAction = (board: Board, action: Action) => {
  let analyze = false;

  switch (action.type) {
    case ActionType.COLOR_CHANGE:
      board.currentColor = action.from as number;
      break;
    case ActionType.CELL_CHANGE:
      board.cells[action.cellIndex as number].value = action.from as
        | number
        | null;
      analyze = true;
      break;
  }

  return analyze;
};

export const undoSingle = (board: Board) => {
  const action = board.actions.pop();
  if (action && undoAction(board, action)) {
    analyzeBoard(board);
  }
};

export const undoColor = (board: Board) => {
  let analyze = false;

  while (board.actions.length > 0) {
    const action = board.actions.pop() as Action;
    analyze = undoAction(board, action) || analyze;

    if (action.type === ActionType.COLOR_CHANGE) {
      break;
    }
  }

  if (analyze) {
    analyzeBoard(board);
  }
};
