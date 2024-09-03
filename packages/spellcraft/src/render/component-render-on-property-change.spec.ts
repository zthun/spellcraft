import { createGuid, html } from "@zthun/helpful-fn";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ZComponentRegister } from "../component/component-register.mjs";
import { IZLifecyclePropertyChanged } from "../lifecycle/lifecycle-property-changed.mjs";
import { ZNode } from "../node/node.mjs";
import { ZProperty } from "../property/property.mjs";
import { ZComponentRenderOnPropertyChanged } from "./component-render-on-property-change.mjs";
import { IZComponentRender } from "./component-render.mjs";

describe("ZComponentRenderOnPropertyChange", () => {
  afterEach(() => {
    new ZNode(document.body).clear();
  });

  const tag = "z-component-render-on-property-change-test";

  @ZComponentRegister(tag)
  @ZComponentRenderOnPropertyChanged()
  class ZComponentRenderOnPropertyChangeTest
    extends HTMLElement
    implements IZComponentRender, IZLifecyclePropertyChanged
  {
    @ZProperty()
    public identity: string;

    public render = vi.fn();
    public $propertyChangedCallback = vi.fn();

    public propertyChangedCallback(
      name: string,
      oldValue: string,
      newValue: string,
    ) {
      return this.$propertyChangedCallback(name, oldValue, newValue);
    }
  }

  const createTestTarget = () => {
    const $html = html`<div><${tag}></${tag}></div>`;
    const template = document.createElement("template");
    template.innerHTML = $html;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentRenderOnPropertyChangeTest>(
      tag,
    )!;
  };

  it("should call the parent attribute changed callback", () => {
    // Arrange.
    const expected = createGuid();
    const target = createTestTarget();
    // Act.
    target.identity = expected;
    // Assert.
    expect(target.render).toHaveBeenCalledTimes(1);
    expect(target.$propertyChangedCallback).toHaveBeenCalledTimes(1);
    expect(target.$propertyChangedCallback).toHaveBeenCalledWith(
      "identity",
      undefined,
      expected,
    );
  });
});
