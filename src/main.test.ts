import { beforeEach, describe, expect, it, vi } from 'vitest';
import htmlContent from '../index.html?raw';

describe('main page', () => {
  beforeEach(async () => {
    document.body.outerHTML = htmlContent;
    await import('./main');
    vi.resetModules();
  });

  describe('theme switch', () => {
    let themeSwitch: HTMLButtonElement;

    beforeEach(() => {
      themeSwitch = document.getElementsByClassName(
        'theme-switch'
      )[0] as HTMLButtonElement;
    });

    it('is initially unchecked', () => {
      expect(themeSwitch.ariaChecked).toEqual('false');
    });

    it('gets checked if clicked', () => {
      themeSwitch.click();

      expect(themeSwitch.ariaChecked).toEqual('true');
    });
  });
});
