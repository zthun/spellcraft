import { createGuid, html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZAttribute } from '../attribute/attribute.mjs';
import { ZNode } from '../node/node.mjs';
import { ZComponentRegister } from './component-register.mjs';
import { IZComponentRender, ZComponentRender } from './component-render.mjs';

describe('ZComponentRender', () => {
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
    @ZComponentRender()
    class ZComponentRenderCustomElementTest extends HTMLElement implements IZComponentRender {
      public static readonly observedAttributes = ['identity'];

      @ZAttribute()
      public identity: string;

      public render = vi.fn();
    }

    it('should render when connected', () => {
      // Arrange.
      // Act.
      const target = createTestTarget<ZComponentRenderCustomElementTest>(tag);
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });

    it('should render when an attribute changes', () => {
      // Arrange.
      const target = createTestTarget<ZComponentRenderCustomElementTest>(tag);
      // Act.
      target.identity = createGuid();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(2);
    });
  });

  describe('Directive Component Flow', () => {
    const directive = 'input';
    const tag = 'z-component-render-directive-test';

    @ZComponentRegister(tag, { extend: directive })
    @ZComponentRender()
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

    it('should render when constructed', () => {
      // Arrange.
      // Act.
      const target = createTestTarget();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });

    it('should render when an attribute changes', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      target.identity = createGuid();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(2);
    });
  });

  describe('Skip all renders', () => {
    const tag = 'z-component-render-never-test';

    @ZComponentRegister(tag)
    @ZComponentRender({ skipConnected: true, skipAttributeChanged: true })
    class ZComponentRenderNeverTest extends HTMLElement implements IZComponentRender {
      public static readonly observedAttributes = ['identity'];

      @ZAttribute()
      public identity: string;

      public render = vi.fn();
    }

    it('should not render when connected', () => {
      // Arrange.
      // Act.
      const target = createTestTarget<ZComponentRenderNeverTest>(tag);
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(0);
    });

    it('should not render when an attribute changes', () => {
      // Arrange.
      const target = createTestTarget<ZComponentRenderNeverTest>(tag);
      // Act.
      target.identity = createGuid();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(0);
    });
  });
});
