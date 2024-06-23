import { beforeEach, describe, expect, it } from 'vitest';
import SudokuBoard from '.';

customElements.define('app-sudoku-board', SudokuBoard);

describe('SudokuBoard', () => {
  beforeEach(() => {
    document.body.innerHTML = '<app-sudoku-board />';
  });

  it('renders all cells', () => {
    expect(document.getElementsByClassName('cell').length).toEqual(81);
  });
});
