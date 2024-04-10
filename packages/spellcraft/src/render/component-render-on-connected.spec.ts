import { html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZComponentRegister } from '../component/component-register.mjs';
import { IZLifecycleConnected } from '../lifecycle/lifecycle-connected.mjs';
import { ZNode } from '../node/node.mjs';
import { ZComponentRenderOnConnected } from './component-render-on-connected.mjs';
import { IZComponentRender } from './component-render.mjs';

describe('ZComponentRenderOnConnected', () => {
  afterEach(() => {
    new ZNode(document.body).clear();
  });

  describe('Custom Element Flow', () => {
    const tag = 'z-component-render-custom-element-test';

    @ZComponentRegister(tag)
    @ZComponentRenderOnConnected()
    class ZComponentRenderCustomElementTest extends HTMLElement implements IZComponentRender, IZLifecycleConnected {
      public render = vi.fn();

      public _connectedCallback = vi.fn();

      public connectedCallback(): void {
        this._connectedCallback();
      }
    }

    const createTestTarget = () => {
      const $html = html`<div><${tag}></${tag}></div>`;
      const template = document.createElement('template');
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentRenderCustomElementTest>(tag)!;
    };

    it('should render when connected', () => {
      // Arrange.
      // Act.
      const target = createTestTarget();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });

    it('should invoke the parent connected callback', () => {
      // Arrange.
      // Act.
      const target = createTestTarget();
      // Assert.
      expect(target._connectedCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Directive Component Flow', () => {
    const directive = 'input';
    const tag = 'z-component-render-directive-test';

    @ZComponentRegister(tag, { extend: directive })
    @ZComponentRenderOnConnected()
    class ZComponentRenderDirectiveTest extends HTMLInputElement implements IZComponentRender {
      public render = vi.fn();

      public _connectedCallback = vi.fn();

      public connectedCallback(): void {
        this._connectedCallback();
      }
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

    it('should invoke the parent connected callback', () => {
      // Arrange.
      // Act.
      const target = createTestTarget();
      // Assert.
      expect(target._connectedCallback).toHaveBeenCalledTimes(1);
    });
  });
});
