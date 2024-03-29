import { IZLifecycleConnected } from '../lifecycle/lifecycle-connected.mjs';

/**
 * A mixin decorator that adds a render invocation on the connected callback lifecycle event.
 *
 * In order for the component to actually render anything, it needs to implement
 * {@link IZComponentRender}. You can build a render function using additional
 * component render decorators, or implement your own.
 *
 * The target node for the render method will be the shadowRoot if it is set, or
 * will point to this object if there is no shadow root.
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
export function ZComponentRenderOnConnected() {
  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;

    const K: any = class extends _Target implements IZLifecycleConnected {
      public connectedCallback() {
        super.connectedCallback?.call(this);
        this.render?.call(this, this.shadowRoot || this);
      }
    };

    return K;
  };
}
