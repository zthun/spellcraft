import { IZLifecycleConnected } from '../lifecycle/lifecycle-connected.mjs';
import { ZComponentConstructor } from './component-constructor.mjs';

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
 * @param TElement -
 *        The type of element that this decorator extends.
 *
 * @returns
 *        A new decorated type that automatically implements {@link IZLifecycleConnected}.
 *        Each method will invoke {@link IZComponentRender.render} unless
 *        the options specify to skip the target lifecycle event.
 *
 * @example
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
export function ZComponentRenderOnConnected<TElement extends HTMLElement>() {
  return function (target: ZComponentConstructor<TElement>): any {
    const _Target = target as any;

    class _ZComponentRenderOnConnected extends _Target implements IZLifecycleConnected {
      public connectedCallback() {
        super.connectedCallback?.call(this);
        this.render?.call(this, this.shadowRoot || this);
      }
    }

    return _ZComponentRenderOnConnected;
  };
}
