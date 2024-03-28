import { registerCustomElement } from '../register/register-custom-element.mjs';

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
 * A mixin decorator that extends a WebComponent and adds the registration.
 *
 * The component will be registered with the custom elements registry.  This is a shortcut
 * for {@link registerCustomElement} with the given options.
 *
 * The registration for a given component should happen as the final step in the
 * decoration stack.  This will register the final output class that extends the target
 * to be constructed.
 *
 * @param tag -
 *        The tag that this component will register with.
 * @param options -
 *        The options for the registration.
 *
 * @returns
 *        An empty class that extends the given class target.  This will
 *        be the constructor function that will get the final registration.
 */
export function ZComponentRegister(tag: string, options?: IZComponentRegisterOptions) {
  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;
    const K: any = class extends _Target {};
    registerCustomElement(tag, K, { extends: options?.extend });
    return K;
  };
}
