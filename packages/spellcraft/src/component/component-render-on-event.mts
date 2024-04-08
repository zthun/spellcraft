import { IZLifecycleConnected, IZLifecycleConnectedMaybe } from '../lifecycle/lifecycle-connected.mjs';
import { IZLifecycleDisconnected, IZLifecycleDisconnectedMaybe } from '../lifecycle/lifecycle-disconnected.mjs';
import { ZComponentConstructor } from './component-constructor.mjs';
import { IZComponentRender } from './component-render.mjs';

type DecoratorRequirements = HTMLElement & IZComponentRender & IZLifecycleConnectedMaybe & IZLifecycleDisconnectedMaybe;

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
export function ZComponentRenderOnEvent<TElement extends DecoratorRequirements>(
  name: string,
  options?: IZComponentRenderOnEventOptions
) {
  const stopPropagation = options?.stopPropagation;
  const stopImmediatePropagation = options?.stopImmediatePropagation;
  const preventDefault = options?.preventDefault;
  const selector = options?.selector;

  return function (target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error 2415 https://github.com/microsoft/TypeScript/issues/58022
    class _ZComponentRenderOnEvent extends target implements IZLifecycleConnected, IZLifecycleDisconnected {
      private __render_on_event_target = () => (selector ? this.querySelector<HTMLElement>(selector) : this);

      private __render_on_event_handle = (e: Event) => {
        if (stopPropagation) {
          e.stopPropagation();
        }

        if (stopImmediatePropagation) {
          e.stopImmediatePropagation();
        }

        if (preventDefault) {
          e.preventDefault();
        }

        this.render(this.shadowRoot || this);
      };

      public render(node: Node) {
        this.__render_on_event_target()?.removeEventListener(name, this.__render_on_event_handle);
        super.render(node);
        this.__render_on_event_target()?.addEventListener(name, this.__render_on_event_handle);
      }

      public connectedCallback(): void {
        super.connectedCallback?.call(this);
        this.__render_on_event_target()?.addEventListener(name, this.__render_on_event_handle);
      }

      public disconnectedCallback(): void {
        super.disconnectedCallback?.call(this);
        this.__render_on_event_target()?.removeEventListener(name, this.__render_on_event_handle);
      }
    }

    return _ZComponentRenderOnEvent;
  };
}
