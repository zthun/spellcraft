/**
 * A mixin that adds an open shadow root to the component.
 *
 * Note that calling this more than once has no effect. It will
 * simply keep the shadow root that has already been declared.
 */
export function ZComponentShadow() {
  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;
    const K: any = class extends _Target {
      public constructor() {
        super();

        if (!this.shadowRoot) {
          // The parent constructor may have already attached a shadow root,
          // so we wouldn't have to add our own.  This WILL fail if the
          // parent adds a closed shadow root.
          this.attachShadow({ mode: 'open' });
        }
      }
    };
    return K;
  };
}
