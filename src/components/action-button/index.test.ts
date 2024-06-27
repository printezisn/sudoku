import { beforeEach, describe, expect, it } from 'vitest';
import ActionButton from '.';
import { state } from '../../stores/game/actions';
import { createBoard } from '../../lib/sudoku/service';
import { Difficulty } from '../../lib/sudoku/models';

customElements.define('app-action-button', ActionButton);

describe('ActionButton', () => {
  describe('when it controls a menu', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
      document.body.innerHTML = `
        <app-action-button menu="mymenu">Press</app-action-button>
        <span></span>
      `;

      button = document.querySelector('button') as HTMLButtonElement;
    });

    it('sets the appropriate accessibility attributes', () => {
      expect(button.getAttribute('aria-expanded')).toEqual('false');
      expect(button.getAttribute('aria-haspopup')).toEqual('true');
      expect(button.getAttribute('aria-controls')).toEqual('mymenu');
      expect(button.getAttribute('role')).toEqual('menuitem');
      expect(button.innerHTML.startsWith('Press<svg')).toBeTruthy();
    });

    it('toggles aria-expanded on click', () => {
      button.click();

      expect(button.getAttribute('aria-expanded')).toEqual('true');
    });

    it('sets aria-expanded as false if the user clicks anywhere else', () => {
      button.click();
      expect(button.getAttribute('aria-expanded')).toEqual('true');

      document.querySelector('span')?.click();
      expect(button.getAttribute('aria-expanded')).toEqual('false');
    });
  });

  describe('when it does not control a menu', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
      state.board = createBoard(Difficulty.EMPTY);
      state.loading = false;

      document.body.innerHTML =
        '<app-action-button action="changeColor">Press</app-action-button>';

      button = document.querySelector('button') as HTMLButtonElement;
    });

    it('sets the appropriate accessibility attributes', () => {
      expect(button.getAttribute('aria-expanded')).toBeFalsy();
      expect(button.getAttribute('aria-haspopup')).toBeFalsy();
      expect(button.getAttribute('aria-controls')).toBeFalsy();
      expect(button.getAttribute('role')).toEqual('menuitem');
      expect(button.innerHTML).toEqual('Press');
    });

    it('does not set aria-expanded on click', () => {
      button.click();

      expect(button.getAttribute('aria-expanded')).toBeFalsy();
    });

    it('runs its action on click', () => {
      button.click();

      expect(state.board.currentColor).toEqual(1);
    });
  });
});
