import { html } from "@zthun/helpful-fn";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ZComponentRegister } from "../component/component-register.mjs";
import { ZNode } from "../node/node.mjs";
import { ZComponentRenderOnEvent } from "./component-render-on-event.mjs";
import { IZComponentRender } from "./component-render.mjs";

describe("ZComponentRenderOnEvent", () => {
  afterEach(() => {
    new ZNode(document.body).clear();
  });

  describe("All events from all children", () => {
    const tag = "z-component-render-on-event-self-and-children-test";

    @ZComponentRegister(tag)
    @ZComponentRenderOnEvent("click")
    class ZComponentRenderOnEventSelfAndChildrenTest
      extends HTMLElement
      implements IZComponentRender
    {
      public _render = vi.fn();

      public render() {
        this._render();
      }
    }

    const createTestTarget = () => {
      const $html = html`
      <div>
        <${tag}>
          <button class='should-raise-click'></button>
        </${tag}>
      </div>
    `;

      const template = document.createElement("template");
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentRenderOnEventSelfAndChildrenTest>(
        tag,
      )!;
    };

    it("should render when an event is raised from the child", () => {
      // Arrange.
      const target = createTestTarget();
      const btn = target.querySelector<HTMLButtonElement>(
        ".should-raise-click",
      );
      target._render.mockClear();
      // Act.
      btn?.click();
      // Assert.
      expect(target._render).toHaveBeenCalledTimes(1);
    });

    it("should render when an event is raised from the component itself", () => {
      // Arrange.
      const target = createTestTarget();
      target._render.mockClear();
      // Act.
      target.click();
      // Assert.
      expect(target._render).toHaveBeenCalledTimes(1);
    });
  });

  describe("Targeted event", () => {
    const tag = "z-component-render-on-event-children-only-test";

    @ZComponentRegister(tag)
    @ZComponentRenderOnEvent("click", {
      preventDefault: true,
      stopImmediatePropagation: true,
      stopPropagation: true,
      selector: ".should-raise-click",
    })
    class ZComponentRenderOnChildrenOnlyEventTest
      extends HTMLElement
      implements IZComponentRender
    {
      public _render = vi.fn();

      public render() {
        this._render();
      }
    }

    const createTestTarget = () => {
      const $html = html`
      <div>
        <${tag}>
          <button class='should-raise-click'></button>
        </${tag}>
      </div>
    `;

      const template = document.createElement("template");
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentRenderOnChildrenOnlyEventTest>(
        tag,
      )!;
    };

    it("should render when an event is raised from the child", () => {
      // Arrange.
      const target = createTestTarget();
      const btn = target.querySelector<HTMLButtonElement>(
        ".should-raise-click",
      );
      target._render.mockClear();
      // Act.
      btn?.click();
      // Assert.
      expect(target._render).toHaveBeenCalledTimes(1);
    });

    it("should not render when an event is raised from the component itself", () => {
      // Arrange.
      const target = createTestTarget();
      target._render.mockClear();
      // Act.
      target.click();
      // Assert.
      expect(target._render).not.toHaveBeenCalled();
    });
  });

  describe("Multiple events", () => {
    const tag = "z-component-render-on-event-multiple-test";

    @ZComponentRegister(tag)
    @ZComponentRenderOnEvent("click", { selector: ".should-also-raise-click" })
    @ZComponentRenderOnEvent("click", { selector: ".should-raise-click" })
    class ZComponentRenderOnEventMultipleTest
      extends HTMLElement
      implements IZComponentRender
    {
      public _render = vi.fn();

      public render() {
        this._render();
      }
    }

    const createTestTarget = () => {
      const $html = html`
        <${tag}>
          <button class='should-raise-click'></button>
          <button class='should-also-raise-click'></button>
        </${tag}>
    `;

      const template = document.createElement("template");
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentRenderOnEventMultipleTest>(
        tag,
      )!;
    };

    it("should render for each event by selector and event name", () => {
      // Arrange.
      const target = createTestTarget();
      const shouldRaiseClick = target.querySelector<HTMLButtonElement>(
        ".should-raise-click",
      );
      const shouldAlsoRaiseClick = target.querySelector<HTMLButtonElement>(
        ".should-also-raise-click",
      );
      target._render.mockClear();
      // Act.
      shouldRaiseClick?.click();
      shouldAlsoRaiseClick?.click();
      // Assert.
      expect(target._render).toHaveBeenCalledTimes(2);
    });
  });
});
