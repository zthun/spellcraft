import { createGuid, firstDefined } from '@zthun/helpful-fn';
import { castArray, kebabCase } from 'lodash-es';
import { IZLifecycleAttributeChanged } from '../lifecycle/lifecycle-attribute-changed.mjs';
import { IZLifecycleConnected } from '../lifecycle/lifecycle-connected.mjs';
import { IZLifecycleDisconnected } from '../lifecycle/lifecycle-disconnected.mjs';
import { IZPropertyChanged } from '../property/property-changed.mjs';
import { registerCustomElement } from '../register/register-custom-element.mjs';
import { IZComponentRender } from './component-render.mjs';
import { IZComponent } from './component.mjs';

/**
 * A web component that has a css factory.
 */
export interface IZComponentStyles {
  /**
   * Returns the current component css styles.
   *
   * @returns
   *        The css of this component.  Should return
   *        undefined if there are no styles.
   */
  styles(): string | undefined;
}

/**
 * Options for a global styles component.
 */
export interface IZComponentStylesOptions extends IZComponent {
  /**
   * The id of the styles.
   *
   * If this is set, then when the component is added, it will attach
   * to the style node and modify that one.
   *
   * It is recommended that if you have this set, then it will only
   * have one style node as that will create a singleton.
   */
  id?: string;

  /**
   * The class name(s) to set on the style element.
   *
   * If this is falsy, then no classes are added.
   *
   * If you pass an array for this value, then
   * every class in the array will be added.
   */
  className?: string | string[];
}

/**
 * A styles component is a component that adds a style element to the document head.
 */
export function ZComponentStyles(options: IZComponentStylesOptions) {
  const { className = [], id, name, tag } = options;

  const $className = castArray(className);
  const $tag = firstDefined(kebabCase(name), tag);

  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;

    const K: any = class
      extends _Target
      implements
        IZLifecycleAttributeChanged,
        IZLifecycleConnected,
        IZLifecycleDisconnected,
        IZPropertyChanged,
        IZComponentRender
    {
      private _id: string;

      public constructor() {
        super();
        this._id = id || createGuid();
      }

      public style() {
        const selector = `#${this._id}`;
        let e = document.querySelector(selector);

        if (e == null) {
          e = document.createElement('style');
          e.id = this._id;
          document.head.appendChild(e);
          e = document.querySelector<HTMLStyleElement>(selector)!;
        }

        return e;
      }

      public render() {
        const $css = this.styles?.call(this);
        this.style().textContent = firstDefined('', $css);
      }

      public connectedCallback() {
        super.connectedCallback?.call(this);
        $className.forEach(($class) => this.style().classList.add($class));
        this.render();
      }

      public disconnectedCallback() {
        super.disconnectedCallback?.call(this);
        this.style().remove();
      }

      public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback?.call(this, name, oldValue, newValue);
        this.render();
      }

      public propertyChangedCallback(name: string | symbol, oldValue: any, newValue: any): void {
        super.propertyChangedCallback?.call(this, name, oldValue, newValue);
        this.render();
      }
    };

    registerCustomElement($tag, K);

    return K;
  };
}
