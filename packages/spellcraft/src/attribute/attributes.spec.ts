import { describe, expect, it } from 'vitest';
import { ZAttributes } from './attributes.mjs';

describe('ZAttributes', () => {
  describe('Query', () => {
    it('should return the value of the attribute', () => {
      // Arrange.
      const key = 'value';
      const expected = 'value-of-attribute';
      const target = document.createElement('input');
      target.setAttribute(key, expected);
      // Act.
      const actual = ZAttributes.query(target, key, 'fallback');
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
      const actual = ZAttributes.query(target, key, expected);
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Mutate', () => {
    it('should remove the attribute if the value is null', () => {
      // Arrange.
      const key = 'value';
      const target = document.createElement('input');
      target.setAttribute(key, 'some-value');
      // Act.
      ZAttributes.mutate(target, key, null);
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
      ZAttributes.mutate(target, key, undefined);
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
      ZAttributes.mutate(target, key, expected);
      const actual = target.getAttribute(key);
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Stringify', () => {
    describe('Null', () => {
      it('should return the empty string', () => {
        expect(ZAttributes.stringify('attr', null)).toEqual('');
      });
    });

    describe('Undefined', () => {
      it('should return the empty string', () => {
        expect(ZAttributes.stringify('attr', undefined)).toEqual('');
      });
    });

    describe('String', () => {
      it('should return the empty string for an empty string', () => {
        expect(ZAttributes.stringify('attr', '')).toEqual('');
      });

      it('should return attr="value"', () => {
        expect(ZAttributes.stringify('attr', 'value')).toEqual('attr="value"');
      });
    });

    describe('Boolean', () => {
      it('should return the empty string for false', () => {
        expect(ZAttributes.stringify('attr', false)).toEqual('');
      });

      it('should return the attribute name for true', () => {
        expect(ZAttributes.stringify('attr', true)).toEqual('attr');
      });
    });

    describe('Number', () => {
      it('should return attr="number"', () => {
        expect(ZAttributes.stringify('attr', 4)).toEqual('attr="4"');
      });
    });

    describe('Object', () => {
      it('should return attr="object" where object is JSON', () => {
        const o = { id: 4, name: 'four' };
        const expected = `attr="${JSON.stringify(o)}"`;
        expect(ZAttributes.stringify('attr', o)).toEqual(expected);
      });
    });
  });
});
