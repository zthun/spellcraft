import { ZComponentConstructor } from '../component/component-constructor.mjs';
import { IZLifecycleConnected, IZLifecycleConnectedMaybe } from '../lifecycle/lifecycle-connected.mjs';
import { IZComponentRender } from './component-render.mjs';

/**
 * Requirements for ZComponentRenderOnConnected targets.
 */
export type ZComponentRenderOnConnectedRequirements = HTMLElement & IZComponentRender & IZLifecycleConnectedMaybe;

/**
 * An aspect that adds a render invocation on the connected callback lifecycle event.
 *
 * In order for the component to actually render anything, it needs to implement
 * {@link IZComponentRender}. You can build a render function using additional
 * component render decorators, or implement your own.
 *
 * The target node for the render method will be the shadowRoot if it is set, or
 * will point to this object if there is no shadow root.
 *
 * @param T -
 *        The type of element that this decorator extends.
 *
 * @returns
 *        A new decorated type that automatically implements the connectedCallback.
 *        The new method will invoke the render() method on the output class.
 *
 * @example
 *
 * ```ts
 * @ZComponentRegister('z-fancy-component')
 * @ZComponentRenderOnConnected()
 * export class ZFancyComponent extends HTMLElement implements IZComponentRender {
 *     public render() {
 *         console.log('I have rendered when I am added to the DOM');
 *     }
 * }
 * ```
 */
export function ZComponentRenderOnConnected<T extends ZComponentRenderOnConnectedRequirements>() {
  return function (target: ZComponentConstructor<T>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentRenderOnConnected extends target implements IZLifecycleConnected {
      public connectedCallback() {
        super.connectedCallback?.call(this);
        this.render(this.shadowRoot || this);
      }
    };
  };
}
