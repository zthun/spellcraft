import { html } from "@zthun/helpful-fn";
import { afterEach, describe, expect, it } from "vitest";
import { ZComponentRegister } from "../component/component-register.mjs";
import { ZComponentShadow } from "../component/component-shadow.mjs";
import { ZNode } from "../node/node.mjs";
import { ZComponentRenderOnConnected } from "../render/component-render-on-connected.mjs";
import {
  IZComponentTemplate,
  ZComponentRenderTemplate,
} from "../render/component-render-template.mjs";
import { IZComponentRender } from "../render/component-render.mjs";
import { ZComponentTemplateNoDisplay } from "./component-template-no-display.mjs";

describe("ZComponentTemplateNoDisplay", () => {
  const tag = "z-component-template-no-display-test";

  afterEach(() => {
    new ZNode(document.body).clear();
  });

  interface ZComponentRenderWithTemplateTest
    extends IZComponentTemplate,
      IZComponentRender {}

  @ZComponentRegister(tag)
  @ZComponentRenderOnConnected()
  @ZComponentRenderTemplate()
  @ZComponentTemplateNoDisplay()
  @ZComponentShadow()
  class ZComponentRenderWithTemplateTest extends HTMLElement {}

  const createTestTarget = () => {
    const template = document.createElement("template");
    template.innerHTML = html`<div><${tag}></${tag}></div>`;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentRenderWithTemplateTest>(tag)!;
  };

  it("should not display the component", () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    const actual = target.shadowRoot?.querySelector("style")?.textContent;
    // Assert.
    expect(actual).toContain("display: none");
  });
});
