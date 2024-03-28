import { createGuid, firstDefined } from '@zthun/helpful-fn';
import { IZLifecycleConnected } from '../lifecycle/lifecycle-connected.mjs';
import { IZLifecycleDisconnected } from '../lifecycle/lifecycle-disconnected.mjs';

/**
 * A web component that has a styles factory.
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
 * Options for a styles component.
 */
export interface IZComponentStylesOptions {
  /**
   * The id of the styles.
   *
   * By setting this, it will keep the styles even
   * after the component has been disconnected.  Setting an id
   * is usually for global styles and will only be set once
   * a component with the styles is used.
   *
   * It is recommended to only use this if you have styles
   * that are static and will not change past the first
   * render.  If you wind up with dynamic styles, I.E, styles
   * that change with an attribute or property, setting a
   * global style is not recommended and you should instead
   * encapsulate those in the components shadow root if
   * available.
   */
  id?: string;
}

/**
 * A component that adds styles to the document head.
 *
 * This is not styles for rendering.  These add global styles
 * to the document head fragment.  If you need to render styles
 * on the shadow root or the node itself, use a render template
 * decorator and include the styles in a style element under that.
 *
 * @param options -
 *        The options for the style component.
 *
 * @returns
 *        A new class that extends from the target class that implements
 *        the styles component.
 */
export function ZComponentStyles(options?: IZComponentStylesOptions) {
  const persistent = !!options?.id;

  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;

    const K: any = class extends _Target implements IZLifecycleConnected, IZLifecycleDisconnected {
      public constructor() {
        super();
        this._id = options?.id || `css-${createGuid()}`;
      }

      __styleElement() {
        const selector = `#${this._id}`;
        let e = document.head.querySelector(selector);

        if (e == null) {
          const insertTarget = this.shadowRoot || document.head;
          e = document.createElement('style');
          e.id = this._id;
          insertTarget.appendChild(e);
          e = document.head.querySelector<HTMLStyleElement>(selector)!;
        }

        return e;
      }

      public connectedCallback() {
        super.connectedCallback?.call(this);
        const $css = this.styles?.call(this);
        this.__styleElement().textContent = firstDefined('', $css);
      }

      public disconnectedCallback() {
        super.disconnectedCallback?.call(this);

        if (!persistent) {
          this.__styleElement().remove();
        }
      }
    };

    return K;
  };
}
