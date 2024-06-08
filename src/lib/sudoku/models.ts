export interface Cell {
  value: number | null;
  color: number;
  hasError: boolean;
  initial: boolean;
  options: Set<number>;
}

export enum ActionType {
  CELL_CHANGE,
  COLOR_CHANGE,
}

export interface Action {
  type: ActionType;
  cellIndex: number | null;
  from: number | string | null;
  to: number | string | null;
}

export interface Board {
  cells: Cell[];
  finished: boolean;
  currentColor: number;
  actions: Action[];
}
