import { html } from "@zthun/helpful-fn";
import { afterEach, describe, expect, it } from "vitest";
import { ZNode } from "../node/node.mjs";
import { ZComponentDependencies } from "./component-dependencies.mjs";
import { ZComponentRegister } from "./component-register.mjs";

describe("ZComponentDependencies", () => {
  const $tag = "z-component-dependencies-test";

  afterEach(() => {
    new ZNode(document.body).clear();
  });

  @ZComponentRegister($tag)
  @ZComponentDependencies([])
  @ZComponentDependencies([])
  class ZComponentDependenciesTest extends HTMLElement {}

  const createTestTarget = () => {
    const $html = html`<div><${$tag}></${$tag}></div>`;
    const template = document.createElement("template");
    template.innerHTML = $html;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentDependenciesTest>($tag);
  };

  it("should render the test component", () => {
    // Arrange.
    // Act.
    const target = createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
