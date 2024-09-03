import { ZComponentConstructor } from "../component/component-constructor.mjs";
import {
  IZLifecycleConnected,
  IZLifecycleConnectedMaybe,
} from "../lifecycle/lifecycle-connected.mjs";
import {
  IZLifecycleDisconnected,
  IZLifecycleDisconnectedMaybe,
} from "../lifecycle/lifecycle-disconnected.mjs";
import { IZComponentRender } from "./component-render.mjs";

/**
 * Requirements for ZComponentRenderOnEvent targets.
 */
export type ZComponentRenderOnEventRequirements = HTMLElement &
  IZComponentRender &
  IZLifecycleConnectedMaybe &
  IZLifecycleDisconnectedMaybe;

/**
 * The options for rendering on an event name.
 */
export interface IZComponentRenderOnEventOptions {
  /**
   * Stops propagation of the event once it reaches this component.
   */
  stopPropagation?: boolean;
  /**
   * Stops propagation of the event once it reaches this component and
   * prevents other peer handlers from executing.
   */
  stopImmediatePropagation?: boolean;
  /**
   * Prevent the default behavior of the event.
   */
  preventDefault?: boolean;
  /**
   * A selector to target a specific child element.
   */
  selector?: string;
}

/**
 * An aspect that causes a render invocation when the target component receives a specific event name.
 *
 * @param name -
 *        The name of the event to listen for.
 * @param options -
 *        Additional options for handling the event.
 *
 * @returns
 *        A new class that extends the target which will invoke the render method
 *        when it receives the event name.  The event will automatically be removed
 *        when the target element is disconnected from the DOM.
 */
export function ZComponentRenderOnEvent<
  TElement extends ZComponentRenderOnEventRequirements,
>(name: string, options?: IZComponentRenderOnEventOptions) {
  const stopPropagation = options?.stopPropagation;
  const stopImmediatePropagation = options?.stopImmediatePropagation;
  const preventDefault = options?.preventDefault;
  const selector = options?.selector;

  function findEventTarget(t: ZComponentRenderOnEventRequirements) {
    return selector ? t.querySelector<HTMLElement>(selector) : t;
  }

  function handleEvent(
    t: ZComponentRenderOnEventRequirements | null,
    e: Event,
  ) {
    if (stopPropagation) {
      e.stopPropagation();
    }

    if (stopImmediatePropagation) {
      e.stopImmediatePropagation();
    }

    if (preventDefault) {
      e.preventDefault();
    }

    t?.render(t?.shadowRoot || t);
  }

  return function (target: ZComponentConstructor<TElement>): any {
    let event = handleEvent.bind(null, null);

    // @ts-expect-error 2415 https://github.com/microsoft/TypeScript/issues/58022
    class _ZComponentRenderOnEvent
      extends target
      implements IZLifecycleConnected, IZLifecycleDisconnected
    {
      public constructor(...args: any[]) {
        super(...args);
        event = handleEvent.bind(this, this);
      }

      public render(node: Node) {
        findEventTarget(this)?.removeEventListener(name, event);
        super.render(node);
        findEventTarget(this)?.addEventListener(name, event);
      }

      public connectedCallback(): void {
        super.connectedCallback?.call(this);
        findEventTarget(this)?.addEventListener(name, event);
      }

      public disconnectedCallback(): void {
        super.disconnectedCallback?.call(this);
        findEventTarget(this)?.removeEventListener(name, event);
      }
    }

    return _ZComponentRenderOnEvent;
  };
}
