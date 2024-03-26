import { describe, expect, it } from 'vitest';
import { $attr, stringifyAttribute } from './stringify-attribute.mjs';

describe('stringifyAttribute', () => {
  describe('Null', () => {
    it('should return the empty string', () => {
      expect($attr('attr', null)).toEqual('');
    });
  });

  describe('Undefined', () => {
    it('should return the empty string', () => {
      expect($attr('attr', undefined)).toEqual('');
    });
  });

  describe('String', () => {
    it('should return the empty string for an empty string', () => {
      expect($attr('attr', '')).toEqual('');
    });

    it('should return attr="value"', () => {
      expect($attr('attr', 'value')).toEqual('attr="value"');
    });
  });

  describe('Boolean', () => {
    it('should return the empty string for false', () => {
      expect(stringifyAttribute('attr', false)).toEqual('');
    });

    it('should return the attribute name for true', () => {
      expect(stringifyAttribute('attr', true)).toEqual('attr');
    });
  });

  describe('Number', () => {
    it('should return attr="number"', () => {
      expect($attr('attr', 4)).toEqual('attr="4"');
    });
  });

  describe('Object', () => {
    it('should return attr="object" where object is JSON', () => {
      const o = { id: 4, name: 'four' };
      const expected = `attr="${JSON.stringify(o)}"`;
      expect($attr('attr', o)).toEqual(expected);
    });
  });
});
