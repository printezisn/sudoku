import { beforeEach, describe, expect, it } from 'vitest';
import htmlContent from '../index.html?raw';

describe('main page', () => {
  beforeEach(async () => {
    document.body.outerHTML = htmlContent;
    await import('./main');
  });

  it('renders the page content', () => {
    expect(document.getElementsByClassName('theme-switch')[0]).toBeTruthy();
  });
});
