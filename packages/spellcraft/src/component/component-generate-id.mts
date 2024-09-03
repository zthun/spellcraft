import { createGuid, firstTruthy } from "@zthun/helpful-fn";
import { IZLifecycleConnectedMaybe } from "../lifecycle/lifecycle-connected.mjs";
import { ZComponentConstructor } from "./component-constructor.mjs";

/**
 * The requirements for ZComponentId targets.
 */
export type ZComponentGenerateIdRequirements = HTMLElement &
  IZLifecycleConnectedMaybe;

/**
 * Options for the {@link ZComponentGenerateId} decorator.
 */
export interface IZComponentGenerateIdOptions {
  /**
   * The default prefix to ensure that the id starts with an alpha character.
   *
   * Defaults to "e"
   */
  prefix?: string;
}

/**
 * Automatically generates an id for the component.
 *
 *
 * @returns
 *        A new class which adds the id of the
 *
 * @example
 * ```ts
 * @ZComponentRegister('z-fancy-component')
 * @ZComponentClass('ZFancyComponent-root')
 * export class FancyComponent extends HTMLElement { }
 * ```
 *
 * Outputs the following to the browser DOM.
 *
 * ```html
 * <z-fancy-component class="ZFancyComponent-root"></z-fancy-component>
 * ```
 */
export function ZComponentGenerateId<
  TElement extends ZComponentGenerateIdRequirements,
>(options?: IZComponentGenerateIdOptions) {
  const prefix = firstTruthy("e", options?.prefix);

  return (target: ZComponentConstructor<TElement>): any => {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    class _ZComponentGenerateId extends target implements IZLifecycleConnected {
      public connectedCallback(): void {
        super.connectedCallback?.call(this);
        this.id = this.id || `${prefix}-${createGuid()}`;
      }
    }

    return _ZComponentGenerateId;
  };
}
