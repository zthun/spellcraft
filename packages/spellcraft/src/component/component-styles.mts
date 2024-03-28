import { createGuid, firstDefined } from '@zthun/helpful-fn';
import { IZLifecycleAttributeChanged } from '../lifecycle/lifecycle-attribute-changed.mjs';
import { IZLifecycleConnected } from '../lifecycle/lifecycle-connected.mjs';
import { IZLifecycleDisconnected } from '../lifecycle/lifecycle-disconnected.mjs';
import { IZPropertyChanged } from '../property/property-changed.mjs';
import { IZComponentRender } from './component-render.mjs';

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
export interface IZComponentStylesOptions {
  /**
   * The id of the styles.
   *
   * By setting this, it will keep the styles even
   * after the component has been removed.  Setting an id
   * is usually for global styles and will only be set once
   * a component with the styles is used.
   *
   * It is recommended to only use this if you have styles
   * that are static and will not change past the first
   * render.  If you wind up with dynamic styles, I.E, styles
   * that change with an attribute, setting a global style is
   * not recommended and you should instead encapsulate those
   * in the components shadow root if available.
   */
  id?: string;
}

/**
 * A component that adds styles to the document.
 *
 * @param options -
 *        The options for the style component.
 *
 * @returns
 *        A new class that extends from the target class that implements
 *        the styles component.
 */
export function ZComponentStyles(options: IZComponentStylesOptions) {
  const { id } = options;
  const persistent = !!id;

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

      public styleElement() {
        const selector = `#${this._id}`;
        const target: Element = this.shadowRoot || document.head;
        let e = target.querySelector(selector);

        if (e == null) {
          e = document.createElement('style');
          e.id = this._id;
          target.appendChild(e);
          e = target.querySelector<HTMLStyleElement>(selector)!;
        }

        return e;
      }

      public render() {
        const $css = this.styles?.call(this);
        this.styleElement().textContent = firstDefined('', $css);
      }

      public connectedCallback() {
        super.connectedCallback?.call(this);
        this.render();
      }

      public disconnectedCallback() {
        super.disconnectedCallback?.call(this);

        if (!persistent) {
          this.styleElement().remove();
        }
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

    return K;
  };
}
