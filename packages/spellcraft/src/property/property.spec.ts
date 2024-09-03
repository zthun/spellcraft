import { describe, expect, it, vi } from "vitest";
import { ZComponentRegister } from "../component/component-register.mjs";
import { IZLifecyclePropertyChanged } from "../lifecycle/lifecycle-property-changed.mjs";
import { ZProperty } from "./property.mjs";

describe("ZProperty", () => {
  const tag = "z-test-component-with-properties";
  const initial = "foo";

  @ZComponentRegister(tag)
  class ZTestComponentWithProperties
    extends HTMLElement
    implements Partial<IZLifecyclePropertyChanged>
  {
    propertyChangedCallback?: (
      name: string,
      oldValue: any,
      newValue: any,
    ) => void;

    @ZProperty({ initial })
    public propertyWithInitialValue?: string;

    @ZProperty()
    public propertyWithNoInitialValue?: string;

    @ZProperty({ attribute: true })
    public propertyWithAutoAttribute?: string;

    @ZProperty({ attribute: (v) => v?.name })
    public propertyWithAttributeFactory?: { name: string };

    @ZProperty({ attribute: true })
    public propertyWithAutoAttributeNonString?: number;
  }

  const createTestTarget = () => new ZTestComponentWithProperties();

  describe("Getter", () => {
    it("should return the current property value as undefined if no initial value", () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.propertyWithNoInitialValue;
      // Assert.
      expect(actual).toBeUndefined();
    });

    it("should return the current property initial value", () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.propertyWithInitialValue;
      // Assert.
      expect(actual).toEqual(initial);
    });
  });

  describe("Setter", () => {
    it("should update the property value", () => {
      // Arrange.
      const target = createTestTarget();
      const expected = "bar";
      // Act.
      target.propertyWithInitialValue = expected;
      const actual = target.propertyWithInitialValue;
      // Assert.
      expect(actual).toEqual(expected);
    });

    it("should invoke the propertyChangeCallback if the object implements it", () => {
      // Arrange.
      const target = createTestTarget();
      const current = target.propertyWithInitialValue;
      const next = "new-value";
      target.propertyChangedCallback = vi.fn();
      // Act.
      target.propertyWithInitialValue = next;
      // Assert.
      expect(target.propertyChangedCallback).toHaveBeenCalledWith(
        "propertyWithInitialValue",
        current,
        next,
      );
    });

    it("should not invoke the propertyChangeCallback if the property is set to the same value", () => {
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

  describe("Attributes", () => {
    it("should add an attribute onto the host component", () => {
      // Arrange.
      const target = createTestTarget();
      const attribute = "data-property-with-auto-attribute";
      const expected = "attribute-value";
      // Act.
      target.propertyWithAutoAttribute = expected;
      const actual = target.getAttribute(attribute);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it("should remove the attribute for undefined", () => {
      // Arrange.
      const target = createTestTarget();
      const attribute = "data-property-with-auto-attribute";
      // Act.
      target.propertyWithAutoAttribute = "some-value";
      target.propertyWithAutoAttribute = undefined;
      const actual = target.getAttribute(attribute);
      // Assert.
      expect(actual).toBeNull();
    });

    it("should add an attribute as the factory parameter", () => {
      // Arrange.
      const target = createTestTarget();
      const attribute = "data-property-with-attribute-factory";
      const expected = "foobar";
      // Act.
      target.propertyWithAttributeFactory = { name: expected };
      const actual = target.getAttribute(attribute);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it("should add a JSON converted attribute", () => {
      // Arrange.
      const target = createTestTarget();
      const attribute = "data-property-with-auto-attribute-non-string";
      const expected = "4";
      // Act.
      target.propertyWithAutoAttributeNonString = +expected;
      const actual = target.getAttribute(attribute);
      // Assert.
      expect(actual).toEqual(expected);
    });
  });
});
