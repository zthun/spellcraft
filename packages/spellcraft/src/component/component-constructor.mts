/**
 * An HTMLElement constructor.
 *
 * This is almost the same as typeof HTMLElement, but it also
 * supports the difference subtypes of HTMLElement.
 */
export type ZComponentConstructor<T extends HTMLElement> = {
  new (...args: any[]): T;
  prototype: T;
};
