import { ZComponentConstructor } from "../component/component-constructor.mjs";

/**
 * A component that has an internal event template to dispatch.
 */
export interface IZComponentDispatch {
  /**
   * Dispatches the event specified by the component.
   */
  runDispatch(): void;
}

/**
 * Requirements for the ZComponentDispatch decorator.
 */
export type ZComponentDispatchRequirements = HTMLElement;

/**
 * An aspect that adds a runDispatch method to dispatch a concrete event.
 *
 * Not that the runDispatch method added will always dispatch an event of
 * the same type.  You may have more than one of these on a class
 * declaration, but remember that the top most one added will invoke
 * the runDispatch in the case that it's called.
 *
 * @param event -
 *        The event to dispatch.  If this is a string, then a new
 *        CustomEvent with all default init parameters is dispatched.
 *        A static event object is copied, and an event factory
 *        will dispatch the event returned from the factory.
 *
 * @returns
 *        A new class prototype that implements {@link IZComponentDispatch},
 *        which will dispatch an event copy specified by {@link event}.
 */
export function ZComponentDispatch<C extends ZComponentDispatchRequirements>(
  event: string | Event | ((t: C) => Event),
) {
  return function (target: ZComponentConstructor<C>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentDispatch
      extends target
      implements IZComponentDispatch
    {
      public runDispatch() {
        if (typeof event === "string") {
          this.dispatchEvent(new CustomEvent(event));
        } else if (typeof event === "function") {
          this.dispatchEvent(event(this as any));
        } else {
          this.dispatchEvent(new Event(event.type, event));
        }
      }
    };
  };
}
