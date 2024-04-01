import { createGuid, html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZAttribute } from '../attribute/attribute.mjs';
import { IZLifecycleAttributeChanged } from '../lifecycle/lifecycle-attribute-changed.mjs';
import { ZNode } from '../node/node.mjs';
import { ZComponentRegister } from './component-register.mjs';
import { ZComponentRenderOnAttributeChanged } from './component-render-on-attribute-change.mjs';
import { IZComponentRender } from './component-render.mjs';

describe('ZComponentRenderOnAttributeChange', () => {
  afterEach(() => {
    new ZNode(document.body).clear();
  });

  describe('Custom Element Flow', () => {
    const tag = 'z-component-render-custom-element-test';

    @ZComponentRegister(tag)
    @ZComponentRenderOnAttributeChanged()
    class ZComponentRenderCustomElementTest
      extends HTMLElement
      implements IZComponentRender, IZLifecycleAttributeChanged
    {
      public static readonly observedAttributes? = ['identity'];

      @ZAttribute()
      public identity: string;

      public render = vi.fn();
      public _attributeChangedCallback = vi.fn();

      public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        return this._attributeChangedCallback(name, oldValue, newValue);
      }
    }

    const createTestTarget = () => {
      const $html = html`<div><${tag}></${tag}></div>`;
      const template = document.createElement('template');
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentRenderCustomElementTest>(tag)!;
    };

    it('should render when an attribute changes', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      target.identity = createGuid();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });

    it('should call the parent attribute changed callback', () => {
      // Arrange.
      const expected = createGuid();
      const target = createTestTarget();
      // Act.
      target.identity = expected;
      // Assert.
      expect(target._attributeChangedCallback).toHaveBeenCalledTimes(1);
      expect(target._attributeChangedCallback).toHaveBeenCalledWith('identity', null, expected);
    });
  });

  describe('Directive Component Flow', () => {
    const directive = 'input';
    const tag = 'z-component-render-directive-test';

    @ZComponentRegister(tag, { extend: directive })
    @ZComponentRenderOnAttributeChanged()
    class ZComponentRenderDirectiveTest extends HTMLInputElement implements IZComponentRender {
      public static readonly observedAttributes? = ['identity'];

      @ZAttribute()
      public identity: string;

      public render = vi.fn();

      public _attributeChangedCallback = vi.fn();

      public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        return this._attributeChangedCallback(name, oldValue, newValue);
      }
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

    it('should call the parent attribute changed callback', () => {
      // Arrange.
      const expected = createGuid();
      const target = createTestTarget();
      // Act.
      target.identity = expected;
      // Assert.
      expect(target._attributeChangedCallback).toHaveBeenCalledTimes(1);
      expect(target._attributeChangedCallback).toHaveBeenCalledWith('identity', null, expected);
    });
  });
});
