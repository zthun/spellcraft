import { firstTruthy } from '@zthun/helpful-fn';
import { kebabCase } from 'lodash-es';
import { registerCustomElement } from '../register/register-custom-element.mjs';
import { IZComponent } from './component.mjs';

/**
 * Options for a {@link ZComponentDirective} element.
 */
export interface IZComponentDirectiveOptions extends IZComponent {
  /**
   * The element that the directive extends.
   */
  extend: string;
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
export function ZComponentDirective(options: IZComponentDirectiveOptions) {
  const { extend, name, tag } = options;
  const $tag = firstTruthy(kebabCase(name), tag);

  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;

    const K: any = class extends _Target {
      public constructor() {
        super();
      }
    };

    registerCustomElement($tag, K, { extends: extend });

    return K;
  };
}
