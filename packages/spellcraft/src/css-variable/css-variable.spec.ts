// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { cssVariable } from './css-variable.mjs';

describe('CSS Variable', () => {
  it('should return the property wrapped in var reference', () => {
    // Arrange.
    const property = '--my-value';
    const expected = `var(--my-value)`;
    // Act.
    const actual = cssVariable(property);
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should add the -- if it does not exist at the beginning of the property', () => {
    // Arrange.
    const property = 'my-value';
    const expected = `var(--my-value)`;
    // Act.
    const actual = cssVariable(property);
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should correct the -- if there is only one -', () => {
    // Arrange.
    const property = '-my-value';
    const expected = `var(--my-value)`;
    // Act.
    const actual = cssVariable(property);
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should correct the -- if there are too many -', () => {
    // Arrange.
    const property = '-----my-value';
    const expected = `var(--my-value)`;
    // Act.
    const actual = cssVariable(property);
    // Assert.
    expect(actual).toEqual(expected);
  });
});
