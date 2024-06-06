import { beforeEach, describe, expect, it } from 'vitest';
import { analyzeBoard, createBoard } from './service';
import type { Board } from './models';

describe('sudoku service', () => {
  describe('createBoard', () => {
    it('creates a new board', () => {
      const board = createBoard();

      expect(board).toMatchObject({
        finished: false,
        currentColor: 0,
        actions: [],
      });
      board.cells.forEach((cell) =>
        expect(cell).toMatchObject({
          value: null,
          color: 0,
          hasError: false,
          initial: false,
          options: new Set(),
        })
      );
    });
  });

  describe('analyzeBoard', () => {
    let board: Board;

    beforeEach(() => {
      board = createBoard();
    });

    it('sets available cell options correctly', () => {
      board.cells[40].value = 5;
      analyzeBoard(board);

      for (let i = 0; i < board.cells.length; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        const group = Math.floor(row / 3) * 3 + Math.floor(col / 3);

        if ((row === 4 || col === 4 || group === 4) && i !== 40) {
          expect(board.cells[i].options).toEqual(
            new Set([1, 2, 3, 4, 6, 7, 8, 9])
          );
        } else {
          expect(board.cells[i].options).toEqual(
            new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
          );
        }

        expect(board.cells[i].hasError).toBeFalsy();
      }

      expect(board.finished).toBeFalsy();
    });

    it('detects errored cells', () => {
      board.cells[40].value = 5;
      board.cells[39].value = 4;
      board.cells[13].value = 5;
      analyzeBoard(board);

      for (let i = 0; i < board.cells.length; i++) {
        if (i === 40 || i === 13) {
          expect(board.cells[i].hasError).toBeTruthy();
          expect(board.cells[i].options).not.toContain(5);
        } else {
          expect(board.cells[i].hasError).toBeFalsy();
        }
      }

      expect(board.finished).toBeFalsy();
    });

    it('detects errored cells', () => {
      board.cells[40].value = 5;
      board.cells[39].value = 4;
      board.cells[13].value = 5;
      analyzeBoard(board);

      for (let i = 0; i < board.cells.length; i++) {
        if (i === 40 || i === 13) {
          expect(board.cells[i].hasError).toBeTruthy();
          expect(board.cells[i].options).not.toContain(5);
        } else {
          expect(board.cells[i].hasError).toBeFalsy();
        }
      }

      expect(board.finished).toBeFalsy();
    });

    it('sets board as finished if all cells have correct values', () => {
      const values = [
        3, 4, 5, 2, 7, 9, 1, 6, 8, 7, 6, 9, 1, 4, 8, 3, 5, 2, 8, 2, 1, 5, 6, 3,
        9, 4, 7, 5, 8, 7, 6, 1, 4, 2, 9, 3, 9, 3, 4, 8, 2, 7, 6, 1, 5, 6, 1, 2,
        3, 9, 5, 7, 8, 4, 4, 5, 6, 7, 3, 1, 8, 2, 9, 2, 9, 3, 4, 8, 6, 5, 7, 1,
        1, 7, 8, 9, 5, 2, 4, 3, 6,
      ];
      for (let i = 0; i < values.length; i++) {
        board.cells[i].value = values[i];
      }

      analyzeBoard(board);

      for (let i = 0; i < board.cells.length; i++) {
        expect(board.cells[i].options).toEqual(new Set([board.cells[i].value]));
        expect(board.cells[i].hasError).toBeFalsy();
      }

      expect(board.finished).toBeTruthy();
    });

    it('does not set board as finished if some cells have incorrect values', () => {
      const values = [
        3, 5, 5, 2, 7, 9, 1, 6, 8, 7, 6, 9, 1, 4, 8, 3, 5, 2, 8, 2, 1, 5, 6, 3,
        9, 4, 7, 5, 8, 7, 6, 1, 4, 2, 9, 3, 9, 3, 4, 8, 2, 7, 6, 1, 5, 6, 1, 2,
        3, 9, 5, 7, 8, 4, 4, 5, 6, 7, 3, 1, 8, 2, 9, 2, 9, 3, 4, 8, 6, 5, 7, 1,
        1, 7, 8, 9, 5, 2, 4, 3, 6,
      ];
      for (let i = 0; i < values.length; i++) {
        board.cells[i].value = values[i];
      }

      analyzeBoard(board);

      for (let i = 0; i < board.cells.length; i++) {
        if (i === 1 || i === 2 || i === 55) {
          expect(board.cells[i].hasError).toBeTruthy();
        } else {
          expect(board.cells[i].hasError).toBeFalsy();
        }
      }

      expect(board.finished).toBeFalsy();
    });
  });
});
