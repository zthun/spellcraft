// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { mutateAttribute } from './mutate-attribute.mjs';

describe('Mutate Attribute', () => {
  it('should remove the attribute if the value is null', () => {
    // Arrange.
    const key = 'value';
    const target = document.createElement('input');
    target.setAttribute(key, 'some-value');
    // Act.
    mutateAttribute(target, key, null);
    const actual = target.getAttribute(key);
    // Assert.
    expect(actual).toBeNull();
  });

  it('should remove the attribute if the value is undefined', () => {
    // Arrange.
    const key = 'value';
    const target = document.createElement('input');
    target.setAttribute(key, 'some-value');
    // Act.
    mutateAttribute(target, key, undefined);
    const actual = target.getAttribute(key);
    // Assert.
    expect(actual).toBeNull();
  });

  it('should set the attribute if the value is defined', () => {
    // Arrange.
    const key = 'value';
    const expected = 'set-value';
    const target = document.createElement('input');
    // Act.
    mutateAttribute(target, key, expected);
    const actual = target.getAttribute(key);
    // Assert.
    expect(actual).toEqual(expected);
  });
});
