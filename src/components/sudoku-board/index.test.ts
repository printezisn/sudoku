import { beforeEach, describe, expect, it } from 'vitest';
import SudokuBoard from '.';

customElements.define('app-sudoku-board', SudokuBoard);

describe('SudokuBoard', () => {
  beforeEach(() => {
    document.body.innerHTML = '<app-sudoku-board />';
  });

  it('renders all cells', () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        expect(document.querySelector(`[row="${i}"][col="${j}"]`)).toBeTruthy();
      }
    }
  });
});
