// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { queryAttribute } from './query-attribute.mjs';

describe('Query Attribute', () => {
  it('should return the value of the attribute', () => {
    // Arrange.
    const key = 'value';
    const expected = 'value-of-attribute';
    const target = document.createElement('input');
    target.setAttribute(key, expected);
    // Act.
    const actual = queryAttribute(target, key, 'fallback');
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should return the fallback if the attribute does not exist', () => {
    // Arrange.
    const key = 'value';
    const expected = 'fallback';
    const target = document.createElement('input');
    target.removeAttribute(key);
    // Act.
    const actual = queryAttribute(target, key, expected);
    // Assert.
    expect(actual).toEqual(expected);
  });
});
