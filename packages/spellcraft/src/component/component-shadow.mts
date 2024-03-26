import { firstDefined } from '@zthun/helpful-fn';
import { castArray, kebabCase } from 'lodash-es';
import { IZElementListen } from '../element/element-listen.mjs';
import { nodePaint } from '../node/node-paint.mjs';
import { registerCustomElement } from '../register-custom-element/register-custom-element.mjs';
import { IZComponentAttributeChanged, IZComponentConnected, IZComponentDisconnected } from './component-lifecycle.mjs';
import { IZComponentPropertyChanged } from './component-property.mjs';
import { IZComponentRender } from './component-render.mjs';

/**
 * Options for a component that renders in the shadow dom.
 */
export interface IZComponentShadowOptions {
  /**
   * The name of the component.
   *
   * This should be in PascalCase as using
   * the ZComponentShadow will effectively
   * add a class of `${name}-root`.
   *
   * This will be converted to kebab case
   * as the tag name.
   *
   * @example
   *
   * name = 'MyButton'
   *
   * // Results in
   * <my-button class="MyButton-root"></my-button>
   */
  name: string;

  /**
   * The tag to use.
   *
   * If this is falsy, then the kebab case of the name is used.
   */
  tag?: string;

  /**
   * The class name to set on the host element.
   *
   * If this is falsy, then "-root" is appended to the name
   * and that is used as the class name.
   *
   * If you pass an array for this value, then
   * every class in the array will be added.  If you pass an empty
   * array, then no classes will be added (not recommended).
   */
  className?: string | string[];

  /**
   * This does nothing.
   *
   * The main point of this is if you want to keep all
   * of your custom web components tree shakable, but
   * the component you're writing depends on other components
   * that have to be registered with the custom elements
   * registry.
   *
   * This essentially makes sure that your dependency graph
   * auto registers those components by forcing an import
   * where you may not actually need the web component
   * instance and instead just need to make sure the actual
   * web component class constructor function is included
   * with your bundle.
   */
  dependencies?: CustomElementConstructor[];

  /**
   * The list of child selectors to listen on for various events.
   *
   * When a shadow component receives these events, it will
   * invoke a render.
   */
  listen?: IZElementListen[];
}

/**
 * A mixin decorator that extends a WebComponent and adds a standard flow.
 *
 * The component will be registered with the custom elements registry. In order for
 * the component to actually render anything, it needs to implement
 * {@link IZComponentRender}
 *
 * @param options -
 *        The options for the custom component.
 *
 * @returns
 *        A new decorated type that automatically implements
 *        {@link IZComponentAttributeChanged} and {@link IZComponentConnected}
 *        and {@link IZComponentPropertyChanged}.
 */
export function ZComponentShadow(options: IZComponentShadowOptions) {
  const { className, listen, name, tag } = options;

  const $className = castArray(firstDefined(`${name}-root`, className));
  const $tag = firstDefined(kebabCase(name), tag);

  return function <C extends typeof HTMLElement>(Target: C) {
    // TypeScript is garbage when it comes to decorators and trying to do
    // type gymnastics.  Just cast this damn thing to any and follow the docs.
    // We only really care about making sure that this decorator is put on the
    // correct type.
    const _Target = Target as any;

    const K: any = class
      extends _Target
      implements
        IZComponentAttributeChanged,
        IZComponentConnected,
        IZComponentDisconnected,
        IZComponentPropertyChanged,
        IZComponentRender
    {
      public constructor() {
        super();

        if (!this.shadowRoot) {
          // The parent constructor may have already attached a shadow root,
          // so we wouldn't have to add our own.  This WILL fail if the
          // parent adds a closed shadow root.
          this.attachShadow({ mode: 'open' });
        }
      }

      _handleListen = () => {
        this.render(this.shadowRoot);
      };

      public render(node: Node) {
        if (super.render) {
          // This may seem a bit weird and backwards, but this is the nature of
          // how decorators work in that they subclass the host prototype.  In this
          // special instance, if the prototype implements a render method,
          // we want to use that instead of our default render method.  Normally
          // this goes the other direction and the parent class implements a render
          // and the child overrides it.
          super.render(node);
          return;
        }

        const $css = this.styles?.call(this);
        const $html = this.template?.call(this);
        nodePaint(node, { css: $css, html: $html });
      }

      public connectedCallback() {
        super.connectedCallback?.call(this);
        $className.forEach(($class) => this.classList.add($class));

        listen?.forEach((t) => {
          const { selector, event = 'change' } = t;
          const element = this.querySelector(selector);
          element?.addEventListener(event, this._handleListen);
        });
        this.render(this.shadowRoot);
      }

      public disconnectedCallback() {
        super.disconnectedCallback?.call(this);
        listen?.forEach((t) => {
          const { selector, event = 'change' } = t;
          const element = this.querySelector(selector);
          element?.removeEventListener(event, this._handleListen);
        });
      }

      public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback?.call(this, name, oldValue, newValue);
        this.render(this.shadowRoot);
      }

      public propertyChangedCallback(name: string | symbol, oldValue: any, newValue: any): void {
        super.propertyChangedCallback?.call(this, name, oldValue, newValue);
        this.render(this.shadowRoot);
      }
    };

    registerCustomElement($tag, K);

    return K;
  };
}
