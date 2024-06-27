import { beforeEach, describe, expect, it } from 'vitest';
import SudokuCell from '.';
import { state } from '../../stores/game/actions';
import * as service from '../../lib/sudoku/service';
import { Difficulty } from '../../lib/sudoku/models';
import {
  SET_GAME_LOADING_ACTION,
  UPDATE_BOARD_ACTION,
} from '../../stores/game/constants';

customElements.define('app-sudoku-cell', SudokuCell);

describe('sudoku cell', () => {
  let cellButton: HTMLButtonElement;

  beforeEach(() => {
    state.board = service.createBoard(Difficulty.EMPTY);
    state.loading = false;
    state.initialized = true;
    localStorage.removeItem('board');

    document.body.innerHTML = '<app-sudoku-cell row="2" col="3" />';
    cellButton = document.querySelector(
      '[aria-label="Sudoku cell row 3 and column 4"]'
    ) as HTMLButtonElement;
  });

  it('renders a cell button', () => {
    expect(cellButton).toBeTruthy();
    expect(cellButton.value).toBeFalsy();
  });

  it('renders regular cell value', () => {
    state.board.cells[21].value = 5;

    window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));

    expect(cellButton.innerHTML).toEqual('5');
    expect(cellButton.classList.contains('initial')).toBeFalsy();
  });

  it('renders initial cell value', () => {
    state.board.cells[21].value = 5;
    state.board.cells[21].initial = true;

    window.dispatchEvent(new CustomEvent(UPDATE_BOARD_ACTION));

    expect(cellButton.innerHTML).toEqual('5');
    expect(cellButton.classList.contains('initial')).toBeTruthy();
  });

  it('is disabled if the state is loading', () => {
    state.loading = true;

    window.dispatchEvent(new CustomEvent(SET_GAME_LOADING_ACTION));

    expect(cellButton.ariaDisabled).toEqual('true');
  });
});
