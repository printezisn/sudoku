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
  from: string | null;
  to: string | null;
}

export interface Board {
  cells: Cell[];
  finished: boolean;
  currentColor: number;
  actions: Action[];
}
