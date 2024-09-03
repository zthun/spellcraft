import { firstDefined } from "@zthun/helpful-fn";
import { ZComponentConstructor } from "../component/component-constructor.mjs";
import {
  IZLifecyclePropertyChanged,
  IZLifecyclePropertyChangedMaybe,
} from "../lifecycle/lifecycle-property-changed.mjs";
import { IZComponentDispatch } from "./component-dispatch.mjs";

/**
 * Requirements for the ZComponentDispatchOnPropertyChanged decorator.
 */
export type ZComponentDispatchOnPropertyChangedRequirements = HTMLElement &
  IZComponentDispatch &
  IZLifecyclePropertyChangedMaybe;

/**
 * Options for the ZComponentDispatchOnPropertyChanged decorator.
 */
export interface IZComponentDispatchOnPropertyChangedOptions {
  /**
   * The properties that will raise this specific event.
   *
   * If this is falsy or empty, then all properties will raise
   * the event.
   */
  filter?: (string | symbol)[];
}

/**
 * An aspect that adds an implementation for invoking the runDispatch when a property changes.
 *
 * @param options -
 *        The options for this dispatch decorator.
 *
 * @returns
 *        A new class prototype that runs the parent prototype
 *        {@link IZComponentDispatch.runDispatch} method when
 *        a property changes on the target class.  Only properties
 *        included in {@link IZComponentDispatchOnPropertyChangedOptions.filter} will run the dispatch.
 */
export function ZComponentDispatchOnPropertyChanged<
  C extends ZComponentDispatchOnPropertyChangedRequirements,
>(options?: IZComponentDispatchOnPropertyChangedOptions) {
  const filter = firstDefined([], options?.filter);

  return function (target: ZComponentConstructor<C>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentDispatchOnPropertyChange
      extends target
      implements IZLifecyclePropertyChanged
    {
      public propertyChangedCallback(
        name: string | symbol,
        oldValue: any,
        newValue: any,
      ): void {
        super.propertyChangedCallback?.call(this, name, oldValue, newValue);

        if (!filter.length || filter.includes(name)) {
          super.runDispatch();
        }
      }
    };
  };
}
