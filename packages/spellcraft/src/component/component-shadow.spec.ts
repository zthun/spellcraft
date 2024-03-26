// @vitest-environment jsdom
import { createGuid, css, html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZElementListenBuilder } from '../element/element-listen.mjs';
import { nodePaint } from '../node/node-paint.mjs';
import { ZAttribute } from './component-attribute.mjs';
import { ZComponentBackground } from './component-background.mjs';
import { ZProperty } from './component-property.mjs';
import { IZComponentRender, IZComponentStyles, IZComponentTemplate } from './component-render.mjs';
import { ZComponentShadow } from './component-shadow.mjs';

describe('ZComponent', () => {
  afterEach(() => nodePaint(document.body));

  describe('Empty Component', () => {
    @ZComponentShadow({ name: 'TestEmptyComponent' })
    class ZTestComponent extends HTMLElement {}

    const createTestTarget = () => {
      const $html = html`<test-empty-component></test-empty-component>`;
      nodePaint(document.body, { html: $html });
      return document.querySelector<ZTestComponent>('test-empty-component')!;
    };

    it('should initialize with the appropriate class', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.classList.contains('TestEmptyComponent-root');
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Basic Component With Styles, Template, and overrides', () => {
    const className = 'ZTestComponent-rendering-root';
    const tag = 'z-styles-and-template';
    const name = 'TestComponentWithStylesAndTemplate';

    @ZComponentShadow({ name, tag, className: [className] })
    class ZTestComponent extends HTMLElement implements IZComponentTemplate, IZComponentStyles {
      public constructor() {
        super();
        // We don't need to do this, but want to make sure
        // it is OK to do so.
        this.attachShadow({ mode: 'open' });
      }

      public styles() {
        return css`
          div {
            background-color: black;
            color: white;
            display: block;
          }
        `;
      }

      public template() {
        return html`
          <div class="ZTestComponent-template">
            <span>Minimum Implementation for </span>
            <slot></slot>
            <span>template.<span>
          </div>`;
      }
    }

    const createTestTarget = () => {
      const $html = html`<${tag}><span>${name}</span></${tag}>`;
      nodePaint(document.body, { html: $html });
      return document.querySelector<ZTestComponent>(tag)!;
    };

    it('should have the correct class name', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.classList.contains(className);
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should render the template', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.shadowRoot!.querySelector('.ZTestComponent-template');
      // Assert.
      expect(actual).not.toBeNull();
    });

    it('should render the styles', () => {
      // Arrange
      const target = createTestTarget();
      // Act.
      const actual = target.shadowRoot!.querySelector('style');
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Component with Custom Render Method', () => {
    @ZComponentShadow({ name: 'ZTestRender' })
    class ZTestRender extends HTMLElement implements IZComponentRender {
      public render(shadow: ShadowRoot) {
        const $css = css`
          div {
            background-color: black;
          }
        `;

        const $html = html`
          <div class="ZTestRender-template">
            <slot></slot>
          </div>
        `;

        nodePaint(shadow, { css: $css, html: $html });
      }
    }

    const createTestTarget = () => {
      const $html = html`<z-test-render><span>Rendered</span></z-test-render>`;
      nodePaint(document.body, { html: $html });
      return document.querySelector<ZTestRender>('z-test-render')!;
    };

    it('should render the template', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.shadowRoot!.querySelector('.ZTestRender-template');
      // Assert.
      expect(actual).not.toBeNull();
    });

    it('should render the styles', () => {
      // Arrange
      const target = createTestTarget();
      // Act.
      const actual = target.shadowRoot!.querySelector('style');
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Component with Attributes and Properties', () => {
    @ZComponentShadow({ name: 'ZAttributesAndProperties' })
    class ZAttributesAndProperties extends HTMLElement implements IZComponentRender {
      public static readonly observedAttributes = ['attribute'];

      @ZAttribute()
      public attribute: string;

      @ZProperty()
      public property: string;

      public render = vi.fn();
    }

    const createTestTarget = () => {
      const $html = html`<z-attributes-and-properties></z-attributes-and-properties>`;
      nodePaint(document.body, { html: $html });
      return document.querySelector<ZAttributesAndProperties>('z-attributes-and-properties')!;
    };

    it('should render when an attribute changes', () => {
      // Arrange.
      const target = createTestTarget();
      const spy = vi.mocked(target.render);
      spy.mockClear();
      // Act.
      target.attribute = 'some-new-value';
      // Assert.
      expect(spy).toHaveBeenCalled();
    });

    it('should render when a property changes', () => {
      // Arrange.
      const target = createTestTarget();
      const spy = vi.mocked(target.render);
      spy.mockClear();
      // Act.
      target.property = 'some-new-value';
      // Assert.
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Component with Background Components', () => {
    const alpha = createGuid();
    const beta = createGuid();
    const charlie = createGuid();

    @ZComponentBackground({ name: 'ZIdentity' })
    class ZIdentity extends HTMLElement {
      public static readonly observedAttributes = ['identity'];

      @ZAttribute()
      public name: string;

      @ZAttribute()
      public identity: string;

      @ZProperty()
      public context: { information: number };
    }

    @ZComponentShadow({
      name: 'ZIdentityListen',
      listen: [
        new ZElementListenBuilder().namedElement('z-identity', 'alpha').build(),
        new ZElementListenBuilder().namedElement('z-identity', 'beta').change().build()
      ],
      dependencies: [ZIdentity]
    })
    class ZIdentityListen extends HTMLElement implements IZComponentRender {
      public render = vi.fn();
    }

    const createTestTarget = () => {
      const $html = html`
        <z-identity-listen>
          <z-identity name="alpha" identity=${alpha}></z-identity>
          <z-identity name="beta" identity=${beta}></z-identity>
          <z-identity name="charlie" identity=${charlie}></z-identity>
        </z-identity-listen>
      `;
      nodePaint(document.body, { html: $html });
      return document.querySelector<ZIdentityListen>('z-identity-listen')!;
    };

    it('should render when the parent receives a target named event from the child attribute change', () => {
      // Arrange.
      const target = createTestTarget();
      const render = vi.mocked(target.render);
      render.mockClear();
      const $alpha = target.querySelector<ZIdentity>('z-identity[name="alpha"]')!;
      // Act.
      $alpha.identity = createGuid();
      // Assert.
      expect(render).toHaveBeenCalled();
    });

    it('should render when the parent receives a target named event from the child property change', () => {
      // Arrange.
      const target = createTestTarget();
      const render = vi.mocked(target.render);
      render.mockClear();
      const $beta = target.querySelector<ZIdentity>('z-identity[name="beta"]')!;
      // Act.
      $beta.context = { information: 100 };
      // Assert.
      expect(render).toHaveBeenCalled();
    });

    it('should not render if there is no listener on the child attribute target', () => {
      // Arrange.
      const target = createTestTarget();
      const render = vi.mocked(target.render);
      render.mockClear();
      const $charlie = target.querySelector<ZIdentity>('z-identity[name="charlie"]')!;
      // Act.
      $charlie.context = { information: 100 };
      // Assert.
      expect(render).not.toHaveBeenCalled();
    });
  });

  describe('Component with Background Components That Raise Custom Events', () => {
    @ZComponentBackground({ name: 'ZCustomFoo', event: new CustomEvent('change.foo') })
    class ZCustomFoo extends HTMLElement {
      public static readonly observedAttributes = ['value'];

      @ZAttribute()
      public value: string;
    }

    @ZComponentBackground({ name: 'ZCustomBar', event: () => new CustomEvent('change.bar') })
    class ZCustomBar extends HTMLElement {
      public static readonly observedAttributes = ['value'];

      @ZAttribute({ type: 'number' })
      public value: number;
    }

    @ZComponentShadow({
      name: 'ZCustomListen',
      dependencies: [ZCustomFoo, ZCustomBar],
      listen: [
        new ZElementListenBuilder().selector('z-custom-foo').event('change.foo').build(),
        new ZElementListenBuilder().selector('z-custom-bar').event('change.bar').build()
      ]
    })
    class ZCustomListen extends HTMLElement implements IZComponentRender {
      public render = vi.fn();
    }

    const createTestTarget = () => {
      const $html = html`
        <z-custom-listen>
          <z-custom-foo value="alpha"></z-identity>
          <z-custom-bar value="beta"></z-identity>
        </z-custom-listen>
      `;
      nodePaint(document.body, { html: $html });
      return document.querySelector<ZCustomListen>('z-custom-listen')!;
    };

    it('should render when the parent receives the target event that was static in the background element', () => {
      // Arrange.
      const target = createTestTarget();
      const render = vi.mocked(target.render);
      render.mockClear();
      const $foo = target.querySelector<ZCustomFoo>('z-custom-foo')!;
      // Act.
      $foo.value = createGuid();
      // Assert.
      expect(render).toHaveBeenCalled();
    });

    it('should render when the parent receives a target named event from the child property change', () => {
      // Arrange.
      const target = createTestTarget();
      const render = vi.mocked(target.render);
      render.mockClear();
      const $bar = target.querySelector<ZCustomBar>('z-custom-bar')!;
      // Act.
      $bar.value = 200;
      // Assert.
      expect(render).toHaveBeenCalled();
    });
  });
});
