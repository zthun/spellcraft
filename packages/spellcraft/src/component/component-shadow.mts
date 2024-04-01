import { ZComponentConstructor } from './component-constructor.mjs';

/**
 * An aspect that adds an open shadow root to the component.
 *
 * Note that calling this more than once has no effect. It will
 * simply keep the shadow root that has already been declared.
 *
 * @param TElement -
 *        The type of element that the target class prototypes from.
 */
export function ZComponentShadow<TElement extends HTMLElement>() {
  return function (target: ZComponentConstructor<TElement>): any {
    const _Target = target as any;

    class _ZComponentWithShadow extends _Target {
      public constructor(...args: any[]) {
        super(...args);

        if (!this.shadowRoot) {
          // The parent constructor may have already attached a shadow root,
          // so we wouldn't have to add our own.  This WILL fail if the
          // parent adds a closed shadow root.
          this.attachShadow({ mode: 'open' });
        }
      }
    }

    return _ZComponentWithShadow;
  };
}
