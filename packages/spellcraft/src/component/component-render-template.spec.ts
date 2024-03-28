import { html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it } from 'vitest';
import { ZNode } from '../node/node.mjs';
import { ZComponentRegister } from './component-register.mjs';
import { IZComponentTemplate, ZComponentRenderTemplate } from './component-render-template.mjs';
import { ZComponentRender } from './component-render.mjs';

describe('ZComponentRenderTemplate', () => {
  afterEach(() => {
    new ZNode(document.body).clear();
  });

  const createTestTarget = <T extends HTMLElement>($tag: string) => {
    const template = document.createElement('template');
    template.innerHTML = html`<div><${$tag}></${$tag}></div>`;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<T>($tag)!;
  };

  describe('With Template', () => {
    const $tag = 'z-component-render-with-template-test';

    @ZComponentRegister($tag)
    @ZComponentRenderTemplate()
    @ZComponentRender()
    class ZComponentRenderWithTemplateTest extends HTMLElement implements IZComponentTemplate {
      public template() {
        return html`<div class="template-content"></div>`;
      }
    }

    it('should render the html returned from the template method directly to the element', () => {
      // Arrange.
      const target = createTestTarget<ZComponentRenderWithTemplateTest>($tag);
      // Act.
      const actual = target.querySelector('.template-content');
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Without Template', () => {
    const $tag = 'z-component-render-without-template-test';

    @ZComponentRegister($tag)
    @ZComponentRenderTemplate()
    @ZComponentRender()
    class ZComponentRenderWithoutTemplateTest extends HTMLElement {}

    it('should render empty to the element', () => {
      // Arrange.
      const target = createTestTarget<ZComponentRenderWithoutTemplateTest>($tag);
      // Act.
      const actual = target.childNodes;
      // Assert.
      expect(actual.length).toEqual(0);
    });
  });
});
