import { createGuid, html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZAttribute } from '../attribute/attribute.mjs';
import { ZNode } from '../node/node.mjs';
import { ZComponentRegister } from './component-register.mjs';
import { ZComponentRenderOnAttributeChanged } from './component-render-on-attribute-change.mjs';
import { IZComponentRender } from './component-render.mjs';

describe('ZComponentRenderOnAttributeChange', () => {
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
    @ZComponentRenderOnAttributeChanged()
    class ZComponentRenderCustomElementTest extends HTMLElement implements IZComponentRender {
      public static readonly observedAttributes = ['identity'];

      @ZAttribute()
      public identity: string;

      public render = vi.fn();
    }

    it('should render when an attribute changes', () => {
      // Arrange.
      const target = createTestTarget<ZComponentRenderCustomElementTest>(tag);
      // Act.
      target.identity = createGuid();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });
  });

  describe('Directive Component Flow', () => {
    const directive = 'input';
    const tag = 'z-component-render-directive-test';

    @ZComponentRegister(tag, { extend: directive })
    @ZComponentRenderOnAttributeChanged()
    class ZComponentRenderDirectiveTest extends HTMLInputElement implements IZComponentRender {
      public static readonly observedAttributes = ['identity'];

      @ZAttribute()
      public identity: string;

      public render = vi.fn();
    }

    const createTestTarget = () => {
      const $html = html`<div><${directive} is="${tag}" /></div>`;
      const template = document.createElement('template');
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentRenderDirectiveTest>(directive)!;
    };

    it('should render when an attribute changes', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      target.identity = createGuid();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });
  });
});
