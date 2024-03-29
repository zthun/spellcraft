import { html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZNode } from '../node/node.mjs';
import { ZComponentRegister } from './component-register.mjs';
import { ZComponentRenderOnConnected } from './component-render-on-connected.mjs';
import { IZComponentRender } from './component-render.mjs';

describe('ZComponentRenderOnConnected', () => {
  afterEach(() => {
    new ZNode(document.body).clear();
  });

  const createTestTarget = <T extends HTMLElement>($tag: string) => {
    const $html = html`<div><${$tag}></${$tag}></div>`;
    const template = document.createElement('template');
    template.innerHTML = $html;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<T>($tag)!;
  };

  describe('Custom Element Flow', () => {
    const tag = 'z-component-render-custom-element-test';

    @ZComponentRegister(tag)
    @ZComponentRenderOnConnected()
    class ZComponentRenderCustomElementTest extends HTMLElement implements IZComponentRender {
      public render = vi.fn();
    }

    it('should render when connected', () => {
      // Arrange.
      // Act.
      const target = createTestTarget<ZComponentRenderCustomElementTest>(tag);
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });
  });

  describe('Directive Component Flow', () => {
    const directive = 'input';
    const tag = 'z-component-render-directive-test';

    @ZComponentRegister(tag, { extend: directive })
    @ZComponentRenderOnConnected()
    class ZComponentRenderDirectiveTest extends HTMLInputElement implements IZComponentRender {
      public render = vi.fn();
    }

    const createTestTarget = () => {
      const $html = html`<div><${directive} is="${tag}" /></div>`;
      const template = document.createElement('template');
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentRenderDirectiveTest>(directive)!;
    };

    it('should render when connected', () => {
      // Arrange.
      // Act.
      const target = createTestTarget();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });
  });
});
