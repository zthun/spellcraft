import { IZLifecycleAttributeChanged } from '../lifecycle/lifecycle-attribute-changed.mjs';
import { ZComponentConstructor } from './component-constructor.mjs';

/**
 * An aspect that adds a render invocation on the attribute changed
 * lifecycle event.
 *
 * In order for the component to actually render anything, it needs to implement
 * {@link IZComponentRender}. You can build a render function using additional
 * component render decorators, or implement your own.
 *
 * The target node for the render method will be the shadowRoot if it is set, or
 * will point to this object if there is no shadow root.
 *
 * @param TElement -
 *        The element type that this aspect decorates.
 *
 * @returns
 *        A new decorated type that automatically implements {@link IZLifecycleAttributeChanged}.
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
export function ZComponentRenderOnAttributeChanged<TElement extends HTMLElement>() {
  return function (Target: ZComponentConstructor<TElement>): any {
    const _Target = Target as any;

    class _ZComponentRenderOnAttributeChanged extends _Target implements IZLifecycleAttributeChanged {
      public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        super.attributeChangedCallback?.call(this, name, oldValue, newValue);
        this.render?.call(this, this.shadowRoot || this);
      }
    }

    return _ZComponentRenderOnAttributeChanged;
  };
}
