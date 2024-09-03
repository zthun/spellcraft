import { firstDefined } from "@zthun/helpful-fn";
import { ZComponentConstructor } from "../component/component-constructor.mjs";
import {
  IZLifecycleAttributeChanged,
  IZLifecycleAttributeChangedMaybe,
} from "../lifecycle/lifecycle-attribute-changed.mjs";
import { IZComponentDispatch } from "./component-dispatch.mjs";

/**
 * Requirements for the ZComponentDispatchOnAttributeChanged decorator.
 */
export type ZComponentDispatchOnAttributeChangedRequirements = HTMLElement &
  IZComponentDispatch &
  IZLifecycleAttributeChangedMaybe;

/**
 * Options for the dispatch event on attribute changed decorator.
 */
export interface IZComponentDispatchOnAttributeChangedOptions {
  /**
   * The attributes that will raise this specific event.
   *
   * If this is falsy or empty, then all attributes will raise
   * the event.
   */
  filter?: string[];
}

/**
 * An aspect that adds an implementation for raising an event
 */
export function ZComponentDispatchOnAttributeChanged<
  C extends ZComponentDispatchOnAttributeChangedRequirements,
>(options?: IZComponentDispatchOnAttributeChangedOptions) {
  const filter = firstDefined([], options?.filter);

  return function (target: ZComponentConstructor<C>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentDispatchOnAttributeChange
      extends target
      implements IZLifecycleAttributeChanged
    {
      public attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string,
      ): void {
        super.attributeChangedCallback?.call(this, name, oldValue, newValue);

        if (!filter.length || filter.includes(name)) {
          super.runDispatch();
        }
      }
    };
  };
}
