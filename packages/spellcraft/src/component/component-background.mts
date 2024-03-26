import { css } from '@zthun/helpful-fn';
import { kebabCase } from 'lodash-es';
import { nodePaint } from '../node/node-paint.mjs';
import { registerCustomElement } from '../register-custom-element/register-custom-element.mjs';
import { IZComponentAttributeChanged } from './component-lifecycle.mjs';
import { IZComponentPropertyChanged } from './component-property.mjs';

/**
 * Options for a {@link ZComponentBackground} element.
 */
export interface IZComponentBackgroundOptions {
  /**
   * The name of the background element.
   *
   * Unlike regular components, this doesn't automatically
   * get a class attached to it, but it will register the
   * kebab case of this name.
   */
  name: string;

  /**
   * The event that is raised when the attributes change or properties change.
   *
   * If you do not specify the event that gets raised, then the default event
   * will be a normal HTML 'change' event.
   *
   * If you pass a function to this, then the argument passed to the function
   * will be the instance of the background component.
   */
  event?: Event | ((d: any) => Event);

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
}

/**
 * A background component is a component that is there to supply values to the host.
 *
 * Background components have a closed shadow root, and they are styled so they
 * have no display and do not take up space in the DOM.
 *
 * These are useful when you have complex objects that you want to support in raw
 * html and you want attribute backed intrinsic properties, but you don't want to have
 * JSON stringify values for the complexity of the object.  These act similar to
 * the options element of a select tag.  Options don't render in the browser but are
 * mostly use to show values in a native drop down implemented by the browser window
 * itself.
 *
 * @param options -
 *        The options to the background component.
 *
 * @returns
 *        A new prototype that extends from the target class and implements
 *        the necessary background functions.
 */
export function ZComponentBackground(options: IZComponentBackgroundOptions) {
  const { name, event } = options;

  const $tag = kebabCase(name);

  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;

    const K: any = class extends _Target implements IZComponentAttributeChanged, IZComponentPropertyChanged {
      _dispatchEvent = () => {
        let $event: Event = new Event('change');

        if (typeof event === 'function') {
          $event = event(this);
        }

        if (typeof event === 'object') {
          $event = new Event(event.type, event);
        }

        this.dispatchEvent($event);
      };

      public constructor() {
        super();

        const $css = css`
          :host {
            display: none;
          }
        `;

        const shadow = this.attachShadow({ mode: 'closed' });
        nodePaint(shadow, { css: $css });
      }

      public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback?.call(this, name, oldValue, newValue);
        this._dispatchEvent();
      }

      public propertyChangedCallback(name: string | symbol, oldValue: any, newValue: any): void {
        super.propertyChangedCallback?.call(this, name, oldValue, newValue);
        this._dispatchEvent();
      }
    };

    registerCustomElement($tag, K);

    return K;
  };
}
