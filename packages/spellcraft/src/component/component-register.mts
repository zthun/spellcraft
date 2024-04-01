import { ZComponentConstructor } from './component-constructor.mjs';

/**
 * Options for registering a component.
 */
export interface IZComponentRegisterOptions {
  /**
   * The optional html tag to extend.
   *
   * If this is set, then tag should be used as an attribute
   * value on the "is" attribute.
   */
  extend?: string;
}

/**
 * An aspect that registers of a custom element or directive to the custom elements registry.
 * *
 * The registration for a given component should happen as the final step in the
 * decoration stack - meaning it should be at the top.  This will register the final
 * output class that extends the target to be constructed. If you have more than 1
 * of these, then only the first one will be registered and subsequent ones will be
 * ignored.
 *
 * @param tag -
 *        The tag that this component will register with.
 * @param options -
 *        The options for the registration.
 * @param TElement -
 *        The type of element this decorator extends.
 *
 * @returns
 *        The class target.
 *
 * @example
 *
 * ```ts
 * // This is equivalent to most docs that put this at the bottom
 * // of the component class.  The main reason to use this is due to
 * // how JavaScript class decorators work.  The ZFancyComponent here
 * // is actually the prototype object, and everything beyond the
 * // bottom level decorator is a class that extends it.  So the
 * // registration has to happen at the top.
 * @ZComponentRegister('z-fancy-component')
 * export class ZFancyComponent extends HTMLElement {
 * }
 *```
 *
 * ```html
 * // In some other html file
 * <div>
 *     <z-fancy-component>
 *        Done right!
 *     </z-fancy-component>
 * </div>
 * ```
 */
export function ZComponentRegister<TElement extends HTMLElement>(tag: string, options?: IZComponentRegisterOptions) {
  return function (target: ZComponentConstructor<TElement>): any {
    if (customElements.get(tag) == null) {
      customElements.define(tag, target, { extends: options?.extend });
    }

    return target;
  };
}
