import { firstDefined } from '@zthun/helpful-fn';
import { ZComponentConstructor } from './component-constructor.mjs';

/**
 * Requirements for the ZComponentShadow decorator.
 */
export type ZComponentShadowRequirements = HTMLElement;

/**
 * Options for the ZComponentShadow decorator.
 */
export interface IZComponentShadowOptions {
  /**
   * Whether the shadow root is open or closed.
   */
  mode?: 'open' | 'closed';
}

/**
 * An aspect that adds an open shadow root to the component.
 *
 * Note that calling this more than once has no effect. It will
 * simply keep the shadow root that has already been declared.
 *
 * @param options -
 *        The options for the decorator.
 * @param TElement -
 *        The type of element that the target class prototypes from.
 */
export function ZComponentShadow<T extends ZComponentShadowRequirements>(options?: IZComponentShadowOptions) {
  const mode = firstDefined('open', options?.mode);

  return function (target: ZComponentConstructor<T>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentWithShadow extends target {
      public constructor(...args: any[]) {
        super(...args);

        try {
          this.attachShadow({ mode });
        } catch {
          // Most likely not supported as the shadow root has already been
          // created by the prototype object.
        }
      }
    };
  };
}
