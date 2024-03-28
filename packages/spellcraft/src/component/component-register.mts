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
 * decoration stack - meaning it should be at the top.  This will register the final
 * output class that extends the target to be constructed.
 *
 * If you have more than 1 of these, then only the first one will be registered and
 * subsequent ones will be ignored.
 *
 * @param tag -
 *        The tag that this component will register with.
 * @param options -
 *        The options for the registration.
 *
 * @returns
 *        The class target.
 */
export function ZComponentRegister(tag: string, options?: IZComponentRegisterOptions) {
  return function <C extends typeof HTMLElement>(Target: C) {
    if (customElements.get(tag) == null) {
      customElements.define(tag, Target, { extends: options?.extend });
    }
    return Target;
  };
}
