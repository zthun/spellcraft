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
import { ZComponentTemplateSlot } from "./component-template-slot.mjs";

describe("ZComponentTemplateSlot", () => {
  const tag = "z-component-template-slot-test";

  afterEach(() => {
    new ZNode(document.body).clear();
  });

  interface ZComponentTemplateSlotTest
    extends IZComponentTemplate,
      IZComponentRender {}

  @ZComponentRegister(tag)
  @ZComponentRenderOnConnected()
  @ZComponentRenderTemplate()
  @ZComponentTemplateSlot()
  @ZComponentShadow()
  class ZComponentTemplateSlotTest extends HTMLElement {}

  const createTestTarget = () => {
    const template = document.createElement("template");
    template.innerHTML = html`
      <div>
        <${tag}>
          <div>Slotted</div>
        </${tag}>
      </div>
    `;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentTemplateSlotTest>(tag)!;
  };

  it("should slot the content", () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    const actual = target.textContent;
    // Assert.
    expect(actual).toContain("Slotted");
  });
});
