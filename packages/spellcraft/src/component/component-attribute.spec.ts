// @vitest-environment jsdom

import { ZTrilean, trilean } from '@zthun/helpful-fn';
import { camelCase, kebabCase } from 'lodash-es';
import { beforeAll, describe, expect, it } from 'vitest';
import { registerCustomElement } from '../register-custom-element/register-custom-element.mjs';
import { ZAttribute } from './component-attribute.mjs';

const Batman = 'batman';
const TowardsInfinity = BigInt('9394839483984938493849839483984938493849');

class ZWithAttributes extends HTMLElement {
  @ZAttribute()
  public stringAttribute: string;

  @ZAttribute({ fallback: Batman })
  public stringWithFallback: string;

  @ZAttribute({ nullable: true })
  public stringNullable: string | null;

  @ZAttribute({ type: 'bigint' })
  public bigIntAttribute: bigint | null;

  @ZAttribute({ type: 'bigint', fallback: TowardsInfinity })
  public bigIntWithFallback: bigint;

  @ZAttribute({ type: 'bigint', nullable: true })
  public bigIntNullable: bigint | null;

  @ZAttribute({ type: 'number' })
  public numberAttribute: number;

  @ZAttribute({ type: 'number', fallback: Number.MAX_SAFE_INTEGER })
  public numberWithFallback: number;

  @ZAttribute({ type: 'number', nullable: true })
  public numberNullable: number | null;

  @ZAttribute({ type: 'boolean' })
  public booleanAttribute: boolean;

  @ZAttribute({ type: 'boolean', fallback: true })
  public booleanWithFallback: boolean;

  @ZAttribute({ type: 'boolean', nullable: true })
  public booleanNullable: boolean | null;

  @ZAttribute({ type: 'function' })
  public functionAttribute: () => any;

  @ZAttribute({ type: 'symbol' })
  public symbolAttribute: symbol;

  @ZAttribute({ type: 'object' })
  public objectAttribute: object;

  @ZAttribute({ type: 'trilean' })
  public trileanAttribute: trilean;

  @ZAttribute({ type: 'trilean', fallback: true })
  public trileanWithFallbackTrue: trilean;
}

describe('ZAttribute', () => {
  const createTestTarget = () => new ZWithAttributes();

  beforeAll(() => {
    registerCustomElement('z-with-attributes', ZWithAttributes);
  });

  function shouldReadTheAttribute<T>(expected: T, attribute: string) {
    // Arrange.
    const target = createTestTarget();
    const kebab = kebabCase(attribute);
    const camel = camelCase(attribute);
    // Act.
    target.setAttribute(kebab, String(expected));
    const actual = target[camel];
    // Assert.
    expect(actual).toEqual(expected);
  }

  function shouldBeDefaultForMissingValue<T>(expected: T, attribute: string) {
    // Arrange.
    const target = createTestTarget();
    const kebab = kebabCase(attribute);
    const camel = camelCase(attribute);
    // Act.
    target.removeAttribute(kebab);
    const actual = target[camel];
    // Assert.
    expect(actual).toEqual(expected);
  }

  function shouldBeNullForNullableValue(attribute: string) {
    // Arrange.
    const target = createTestTarget();
    const kebab = kebabCase(attribute);
    const camel = camelCase(attribute);
    // Act.
    target.removeAttribute(kebab);
    const actual = target[camel];
    // Assert.
    expect(actual).toBeNull();
  }

  function shouldUpdateTheAttribute<T>(expected: T, attribute: string) {
    // Arrange.
    const target = createTestTarget();
    const kebab = kebabCase(attribute);
    const camel = camelCase(attribute);
    // Act.
    target[camel] = expected;
    const actual = target.getAttribute(kebab);
    // Assert.
    expect(actual).toEqual(String(expected));
  }

  function shouldDefaultTheAttribute<T>(expected: T, attribute: string) {
    // Arrange.
    const target = createTestTarget();
    const camel = camelCase(attribute);
    // Act.
    target[camel] = null;
    const actual = target[camel];
    // Assert.
    expect(actual).toEqual(expected);
  }

  function shouldRequireProperty(attribute: string) {
    // Arrange.
    const target = createTestTarget();
    const camel = camelCase(attribute);
    // Act.
    const actual = () => (target[camel] = Symbol());
    // Assert.
    expect(actual).toThrowError();
  }

  describe('String', () => {
    it('should read the attribute', () => {
      shouldReadTheAttribute('text for my element', 'string-attribute');
    });

    it('should return fallback for a missing attribute', () => {
      shouldBeDefaultForMissingValue('', 'string-attribute');
    });

    it('should set the attribute', () => {
      shouldUpdateTheAttribute('text for my element', 'string-attribute');
    });

    it('should default the attribute', () => {
      shouldDefaultTheAttribute('', 'string-attribute');
    });

    it('should default to null for nullable', () => {
      shouldBeNullForNullableValue('string-nullable');
    });

    it('should default the attribute with a fallback', () => {
      shouldDefaultTheAttribute(Batman, 'string-with-fallback');
    });
  });

  describe('BigInt', () => {
    it('should read the attribute', () => {
      shouldReadTheAttribute(BigInt(42), 'big-int-attribute');
    });

    it('should return null for a missing attribute', () => {
      shouldBeDefaultForMissingValue(null, 'big-int-attribute');
    });

    it('should return fallback for a missing attribute with a fallback', () => {
      shouldBeDefaultForMissingValue(TowardsInfinity, 'big-int-with-fallback');
    });

    it('should default to null for nullable', () => {
      shouldBeNullForNullableValue('big-int-nullable');
    });

    it('should set the attribute', () => {
      shouldUpdateTheAttribute(BigInt(42), 'big-int-attribute');
    });
  });

  describe('Number', () => {
    it('should read the attribute', () => {
      shouldReadTheAttribute(42, 'number-attribute');
    });

    it('should return null for a missing attribute', () => {
      shouldBeDefaultForMissingValue(NaN, 'number-attribute');
    });

    it('should set the attribute', () => {
      shouldUpdateTheAttribute(BigInt(42), 'number-attribute');
    });

    it('should default the attribute', () => {
      shouldDefaultTheAttribute(NaN, 'number-attribute');
    });

    it('should default to null for nullable', () => {
      shouldBeNullForNullableValue('number-nullable');
    });

    it('should default the attribute to a fallback', () => {
      shouldDefaultTheAttribute(Number.MAX_SAFE_INTEGER, 'number-with-fallback');
    });
  });

  describe('Object', () => {
    it('should always return null (not supported)', () => {
      shouldReadTheAttribute(null, 'object-attribute');
    });

    it('should throw an error when being set', () => {
      shouldRequireProperty('object-attribute');
    });
  });

  describe('Boolean', () => {
    it('should return true if the value is true', () => {
      shouldReadTheAttribute(true, 'boolean-attribute');
    });

    it('should return false if the value is false', () => {
      shouldReadTheAttribute(false, 'boolean-attribute');
    });

    it('should return true if the value is empty', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      target.setAttribute('boolean-attribute', '');
      const actual = target.booleanAttribute;
      // Assert.
      expect(actual).toEqual(true);
    });

    it('should return false if the value is null', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      target.removeAttribute('boolean-attribute');
      const actual = target.booleanAttribute;
      // Assert.
      expect(actual).toEqual(false);
    });

    it('should default to null for nullable', () => {
      shouldBeNullForNullableValue('boolean-nullable');
    });

    it('should return the fallback if the attribute is not set', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      target.removeAttribute('boolean-with-fallback');
      const actual = target.booleanWithFallback;
      // Assert.
      expect(actual).toEqual(true);
    });

    it('should set the attribute', () => {
      shouldUpdateTheAttribute(false, 'boolean-attribute');
    });

    it('should default the attribute', () => {
      shouldDefaultTheAttribute(false, 'boolean-attribute');
    });
  });

  describe('Function', () => {
    it('should always return null (not supported)', () => {
      shouldReadTheAttribute(null, 'function-attribute');
    });

    it('should throw an error when being set', () => {
      shouldRequireProperty('function-attribute');
    });
  });

  describe('Symbol', () => {
    it('should always return null (not supported)', () => {
      shouldReadTheAttribute(null, 'symbol-attribute');
    });

    it('should throw an error when being set', () => {
      shouldRequireProperty('symbol-attribute');
    });
  });

  describe('Trilean', () => {
    it('should return true if the value is true', () => {
      shouldReadTheAttribute(true, 'trilean-attribute');
    });

    it('should return false if the value is false', () => {
      shouldReadTheAttribute(false, 'trilean-attribute');
    });

    it('should return indeterminate if the value is indeterminate', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      target.setAttribute('trilean-attribute', ZTrilean.stringify(ZTrilean.Indeterminate));
      const actual = target.trileanAttribute;
      // Assert.
      expect(actual).toEqual(ZTrilean.Indeterminate);
    });

    it('should return false if the value is empty', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      target.setAttribute('trilean-attribute', '');
      const actual = target.trileanAttribute;
      // Assert.
      expect(actual).toEqual(false);
    });

    it('should return the fallback if the attribute is not set', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      target.removeAttribute('trilean-with-fallback-true');
      const actual = target.trileanWithFallbackTrue;
      // Assert.
      expect(actual).toEqual(true);
    });

    it('should set the attribute to false', () => {
      shouldUpdateTheAttribute(false, 'trilean-attribute');
    });

    it('should set the attribute to true', () => {
      shouldUpdateTheAttribute(true, 'trilean-attribute');
    });

    it('should set the attribute to indeterminate', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      target.trileanAttribute = ZTrilean.Indeterminate;
      const actual = target.getAttribute('trilean-attribute');
      // Assert.
      expect(actual).toEqual('indeterminate');
    });

    it('should default the attribute', () => {
      shouldDefaultTheAttribute(false, 'trilean-attribute');
    });
  });
});
