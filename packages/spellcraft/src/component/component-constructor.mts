export type ZComponentConstructor<T extends HTMLElement> = {
  new (): T;
  prototype: T;
};
