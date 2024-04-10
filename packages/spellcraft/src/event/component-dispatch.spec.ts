import { createGuid, html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZAttribute } from '../attribute/attribute.mjs';
import { ZComponentRegister } from '../component/component-register.mjs';
import { IZLifecycleAttributeChanged } from '../lifecycle/lifecycle-attribute-changed.mjs';
import { IZLifecycleConnected } from '../lifecycle/lifecycle-connected.mjs';
import { IZLifecyclePropertyChanged } from '../lifecycle/lifecycle-property-changed.mjs';
import { ZNode } from '../node/node.mjs';
import { ZProperty } from '../property/property.mjs';
import { ZComponentDispatchOnAttributeChanged } from './component-dispatch-on-attribute-changed.mjs';
import { ZComponentDispatchOnPropertyChanged } from './component-dispatch-on-property-changed.mjs';
import { IZComponentDispatch, ZComponentDispatch } from './component-dispatch.mjs';

describe('ZComponentDispatch', () => {
  const tag = 'z-component-dispatch-test';

  interface ZComponentDispatchTest extends IZComponentDispatch {}

  afterEach(() => {
    new ZNode(document.body).clear();
  });

  @ZComponentRegister(tag)
  @ZComponentDispatchOnPropertyChanged()
  @ZComponentDispatch('property-change-callback')
  @ZComponentDispatchOnPropertyChanged({ filter: ['identity'] })
  @ZComponentDispatch(new CustomEvent('identity'))
  @ZComponentDispatchOnAttributeChanged()
  @ZComponentDispatch(() => new CustomEvent('attribute-change-callback'))
  @ZComponentDispatchOnAttributeChanged({ filter: ['custom-change-callback'] })
  @ZComponentDispatch(() => new CustomEvent('custom-change-callback'))
  class ZComponentDispatchTest
    extends HTMLElement
    implements IZLifecycleAttributeChanged, IZLifecycleConnected, IZLifecyclePropertyChanged
  {
    public static readonly observedAttributes = Object.freeze(['change', 'custom-change-callback']);

    @ZAttribute()
    public change: string;

    @ZAttribute()
    public customChangeCallback: string;

    @ZProperty()
    public identity: string;

    @ZProperty()
    public identitySilent: string;

    public $connectedCallback = vi.fn();
    public $attributeChangedCallback = vi.fn();
    public $propertyChangedCallback = vi.fn();

    public connectedCallback(): void {
      this.$connectedCallback();
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
      this.$attributeChangedCallback(name, oldValue, newValue);
    }

    public propertyChangedCallback(name: string | symbol, oldValue: any, newValue: any): void {
      this.$propertyChangedCallback(name, oldValue, newValue);
    }
  }

  const createTestTarget = () => {
    const $html = html`<div><${tag}></${tag}></div>`;
    const template = document.createElement('template');
    template.innerHTML = $html;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentDispatchTest>(tag)!;
  };

  describe('Property', () => {
    it('should raise a new event', () => {
      // Arrange.
      const target = createTestTarget();
      const expected = vi.fn();
      target.addEventListener('identity', expected);
      expected.mockClear();
      // Act.
      target.identity = createGuid();
      target.removeEventListener('identity', expected);
      // Assert.
      expect(expected).toHaveBeenCalledTimes(1);
    });

    it('should not raise the event if the filter does not match', () => {
      // Arrange.
      const target = createTestTarget();
      const unexpected = vi.fn();
      target.addEventListener('identity', unexpected);

      // Act.
      target.identitySilent = createGuid();
      target.removeEventListener('identity', unexpected);

      // Assert.
      expect(unexpected).not.toHaveBeenCalled();
    });

    it('should invoke the parent propertyChangeEvent', () => {
      // Arrange.
      const target = createTestTarget();
      const expected = createGuid();
      target.identity = '';
      target.$propertyChangedCallback.mockClear();
      // Act.
      target.identity = expected;
      // Assert.
      expect(target.$propertyChangedCallback).toHaveBeenCalledWith('identity', '', expected);
    });
  });

  describe('Attribute', () => {
    it('should raise a new custom event', () => {
      // Arrange.
      const target = createTestTarget();
      const expected = vi.fn();
      target.addEventListener('custom-change-callback', expected);
      expected.mockClear();
      // Act.
      target.customChangeCallback = createGuid();
      target.removeEventListener('custom-change-callback', expected);
      // Assert.
      expect(expected).toHaveBeenCalledTimes(1);
    });

    it('should not raise the event if the filter does not match', () => {
      // Arrange.
      const target = createTestTarget();
      const unexpected = vi.fn();
      target.addEventListener('custom-change-callback', unexpected);

      // Act.
      target.change = createGuid();
      target.removeEventListener('custom-change-callback', unexpected);

      // Assert.
      expect(unexpected).not.toHaveBeenCalled();
    });

    it('should invoke the parent attributeChangedCallback', () => {
      // Arrange.
      const target = createTestTarget();
      const expected = createGuid();
      target.$attributeChangedCallback.mockClear();
      // Act.
      target.customChangeCallback = expected;
      // Assert.
      expect(target.$attributeChangedCallback).toHaveBeenCalledWith('custom-change-callback', null, expected);
    });
  });
});
