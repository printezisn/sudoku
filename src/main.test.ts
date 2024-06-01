import { describe, expect, it } from 'vitest';
import { sum } from './main';

describe('main', () => {
  it('returns the sum of 2 numbers', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
