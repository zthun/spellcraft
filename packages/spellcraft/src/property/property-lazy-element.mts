/**
 * Requirements for the lazy element property decorator.
 */
export type ZPropertyLazyElementRequirements<T extends HTMLElement> = T;

/**
 * Options when lazily creating an HTMLElement property.
 */
export interface IZPropertyLazyElementOptions<T extends HTMLElement> {
  /**
   * The html selector.
   *
   * If this is falsy, then the name is used.  Setting this
   * will most likely require you to use the factory method
   * option to construct the node.
   */
  selector?: string;

  /**
   * The factory method to construct the node.
   *
   * If this is falsy, then document.createElement with the given name is used.
   */
  factory?: () => T;
}

/**
 * A decorator which will attempt to find an existing element in the shadow dom or node list.
 *
 * If such an element with the given selector or name does not exist, then the named element
 * is created and appended to the shadow root.  If the shadow root is falsy, then
 * the element is appended to the given attached property node.
 *
 * @param name -
 *        The name of the element.  This will be passed to document.createElement in the case
 *        that an element with a given selector/name cannot be found.
 * @param options -
 *        Additional options for the decorator.
 *
 * @returns
 *        A property decorator which will return a read only property
 *        that lazy loads an element onto the shadow dom or attached element.
 */
export function ZPropertyLazyElement<T extends HTMLElement, C extends ZPropertyLazyElementRequirements<T>>(
  name: string,
  options?: IZPropertyLazyElementOptions<T>
): PropertyDecorator {
  return (target: C, propertyKey: string | symbol): void => {
    const $factory = () => document.createElement(name) as T;
    const { selector = name, factory = $factory } = options || {};

    function get(this: HTMLElement) {
      const target = this.shadowRoot || this;

      let node = target.querySelector<T>(selector);

      if (node == null) {
        node = factory();
        target.appendChild(node);
      }

      return node;
    }

    Object.defineProperty(target, propertyKey, { get });
  };
}
