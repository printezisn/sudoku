import { beforeEach, describe, expect, it } from 'vitest';
import ActionButton from '.';

customElements.define('app-action-button', ActionButton);

describe('ActionButton', () => {
  describe('when it controls a menu', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
      document.body.innerHTML =
        '<app-action-button menu="mymenu" action="run">Press</app-action-button>';

      button = document.querySelector('button') as HTMLButtonElement;
    });

    it('sets the appropriate accessibility attributes', () => {
      expect(button.getAttribute('aria-expanded')).toEqual('false');
      expect(button.getAttribute('aria-haspopup')).toEqual('true');
      expect(button.getAttribute('aria-controls')).toEqual('mymenu');
      expect(button.getAttribute('role')).toEqual('menuitem');
      expect(button.innerHTML).toEqual('Press');
    });

    it('toggles aria-expanded on click', () => {
      button.click();

      expect(button.getAttribute('aria-expanded')).toEqual('true');
    });
  });

  describe('when it does not control a menu', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
      document.body.innerHTML =
        '<app-action-button action="run">Press</app-action-button>';

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
  });
});
