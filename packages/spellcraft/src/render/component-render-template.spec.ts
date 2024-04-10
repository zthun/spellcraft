import { html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it } from 'vitest';
import { ZComponentRegister } from '../component/component-register.mjs';
import { ZNode } from '../node/node.mjs';
import { ZComponentRenderOnConnected } from './component-render-on-connected.mjs';
import { IZComponentTemplate, ZComponentRenderTemplate } from './component-render-template.mjs';
import { IZComponentRender } from './component-render.mjs';

describe('ZComponentRenderTemplate', () => {
  const tag = 'z-component-render-with-template-test';

  afterEach(() => {
    new ZNode(document.body).clear();
  });

  interface ZComponentRenderWithTemplateTest extends IZComponentRender {}

  @ZComponentRegister(tag)
  @ZComponentRenderTemplate()
  @ZComponentRenderOnConnected()
  class ZComponentRenderWithTemplateTest extends HTMLElement implements IZComponentTemplate {
    public template() {
      return html`<div class="template-content"></div>`;
    }
  }

  const createTestTarget = () => {
    const template = document.createElement('template');
    template.innerHTML = html`<div><${tag}></${tag}></div>`;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentRenderWithTemplateTest>(tag)!;
  };

  it('should render the html returned from the template method directly to the element', () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    const actual = target.querySelector('.template-content');
    // Assert.
    expect(actual).toBeTruthy();
  });
});
