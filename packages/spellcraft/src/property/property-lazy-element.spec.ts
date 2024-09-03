/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, expect, it } from "vitest";
import { ZComponentRegister } from "../component/component-register.mjs";
import { ZComponentShadow } from "../component/component-shadow.mjs";
import { ZPropertyLazyElement } from "./property-lazy-element.mjs";

describe("ZPropertyLazyElement", () => {
  describe("With Shadow Root", () => {
    const tag = "z-shadow-component-with-lazy-element";

    @ZComponentRegister(tag)
    @ZComponentShadow()
    class ZShadowComponentWithLazyElement extends HTMLElement {
      @ZPropertyLazyElement("dialog")
      public readonly dialog: HTMLDialogElement;

      @ZPropertyLazyElement("div", {
        selector: ".with-factory",
        factory: () => {
          const element = document.createElement("div");
          element.classList.add("with-factory");
          return element;
        },
      })
      public readonly divWithFactory: HTMLDivElement;
    }

    const createTestTarget = () => new ZShadowComponentWithLazyElement();

    it("should add the node and continuously return it", () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const expected = target.dialog;
      const actual = target.dialog;
      // Assert.
      expect(actual).toBe(expected);
    });

    it("should only add the node once", () => {
      // Arrange.
      const target = createTestTarget();
      target.dialog;
      target.dialog;
      target.dialog;
      // Act.
      const actual = target.shadowRoot!.querySelectorAll("dialog");
      // Assert.
      expect(actual.length).toEqual(1);
    });

    it("should add the node to the shadow root", () => {
      // Arrange.
      const target = createTestTarget();
      const expected = target.divWithFactory;
      // Act.
      const actual = target.shadowRoot!.querySelector(".with-factory");
      // Assert.
      expect(actual).toBe(expected);
    });
  });

  describe("Without shadow root", () => {
    const tag = "z-light-component-with-lazy-element";

    @ZComponentRegister(tag)
    class ZLightComponentWithLazyElement extends HTMLElement {
      @ZPropertyLazyElement("dialog")
      public readonly dialog: HTMLDialogElement;
    }

    const createTestTarget = () => new ZLightComponentWithLazyElement();

    it("should add the node to the target element", () => {
      // Arrange.
      const target = createTestTarget();
      const expected = target.dialog;
      target.dialog;
      target.dialog;
      // Act.
      const nodes = target.querySelectorAll("dialog");
      const { length } = nodes;
      const actual = nodes.item(0);
      // Assert.
      expect(length).toEqual(1);
      expect(actual).toBe(expected);
    });
  });
});
