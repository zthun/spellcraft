// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { registerCustomElement } from '../register-custom-element/register-custom-element.mjs';
import { IZComponentPropertyChanged, ZProperty, ZPropertyChangedCallbackFunction } from './component-property.mjs';

const initial = 'foo';

class ZTestComponentWithProperties extends HTMLElement implements Partial<IZComponentPropertyChanged> {
  propertyChangedCallback?: ZPropertyChangedCallbackFunction;

  @ZProperty({ initial })
  public propertyWithInitialValue?: string;

  @ZProperty()
  public propertyWithNoInitialValue?: string;

  @ZProperty({ attribute: true })
  public propertyWithAutoAttribute?: string;

  @ZProperty<{ name: string }>({ attribute: (v) => v?.name })
  public propertyWithAttributeFactory?: { name: string };

  @ZProperty<number>({ attribute: true })
  public propertyWithAutoAttributeNonString?: number;
}

class ZNonElement {
  @ZProperty()
  public propertyButNoElement?: string;
}

describe('ZProperty', () => {
  const createTestTarget = () => new ZTestComponentWithProperties();

  beforeAll(() => {
    registerCustomElement('z-test-component-with-properties', ZTestComponentWithProperties);
  });

  describe('Getter', () => {
    it('should return the current property value as undefined if no initial value', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.propertyWithNoInitialValue;
      // Assert.
      expect(actual).toBeUndefined();
    });

    it('should return the current property initial value', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.propertyWithInitialValue;
      // Assert.
      expect(actual).toEqual(initial);
    });
  });

  describe('Setter', () => {
    it('should update the property value', () => {
      // Arrange.
      const target = createTestTarget();
      const expected = 'bar';
      // Act.
      target.propertyWithInitialValue = expected;
      const actual = target.propertyWithInitialValue;
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should invoke the propertyChangeCallback if the object implements it', () => {
      // Arrange.
      const target = createTestTarget();
      const current = target.propertyWithInitialValue;
      const next = 'new-value';
      target.propertyChangedCallback = vi.fn();
      // Act.
      target.propertyWithInitialValue = next;
      // Assert.
      expect(target.propertyChangedCallback).toHaveBeenCalledWith('propertyWithInitialValue', current, next);
    });

    it('should not invoke the propertyChangeCallback if the property is set to the same value', () => {
      // Arrange.
      const target = createTestTarget();
      const current = target.propertyWithInitialValue;
      target.propertyChangedCallback = vi.fn();
      // Act.
      target.propertyWithInitialValue = current;
      // Assert.
      expect(target.propertyChangedCallback).not.toHaveBeenCalled();
    });
  });

  describe('Attributes', () => {
    it('should add an attribute onto the host component', () => {
      // Arrange.
      const target = createTestTarget();
      const attribute = 'data-property-with-auto-attribute';
      const expected = 'attribute-value';
      // Act.
      target.propertyWithAutoAttribute = expected;
      const actual = target.getAttribute(attribute);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should remove the attribute for undefined', () => {
      // Arrange.
      const target = createTestTarget();
      const attribute = 'data-property-with-auto-attribute';
      // Act.
      target.propertyWithAutoAttribute = 'some-value';
      target.propertyWithAutoAttribute = undefined;
      const actual = target.getAttribute(attribute);
      // Assert.
      expect(actual).toBeNull();
    });

    it('should add an attribute as the factory parameter', () => {
      // Arrange.
      const target = createTestTarget();
      const attribute = 'data-property-with-attribute-factory';
      const expected = 'foobar';
      // Act.
      target.propertyWithAttributeFactory = { name: expected };
      const actual = target.getAttribute(attribute);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should add a JSON converted attribute', () => {
      // Arrange.
      const target = createTestTarget();
      const attribute = 'data-property-with-auto-attribute-non-string';
      const expected = '4';
      // Act.
      target.propertyWithAutoAttributeNonString = +expected;
      const actual = target.getAttribute(attribute);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should not set any attributes if the target class is not an Element', () => {
      // Arrange.
      const target = new ZNonElement();
      const expected = 'this should be fine';
      // Act.
      target.propertyButNoElement = expected;
      const actual = target.propertyButNoElement;
      // Assert.
      expect(actual).toEqual(expected);
    });
  });
});
