import { ZComponentConstructor } from '../component/component-constructor.mjs';
import {
  IZLifecycleAttributeChanged,
  IZLifecycleAttributeChangedMaybe
} from '../lifecycle/lifecycle-attribute-changed.mjs';
import { IZComponentRender } from './component-render.mjs';

/**
 * Requirements for ZComponentRenderOnAttributeChanged targets.
 */
export type ZComponentRenderOnAttributeChangedRequirements = HTMLElement &
  Required<IZComponentRender> &
  IZLifecycleAttributeChangedMaybe;

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
export function ZComponentRenderOnAttributeChanged<TElement extends ZComponentRenderOnAttributeChangedRequirements>() {
  return function (Target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentRenderOnAttributeChanged extends Target implements Required<IZLifecycleAttributeChanged> {
      public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        super.attributeChangedCallback?.call(this, name, oldValue, newValue);
        this.render(this.shadowRoot || this);
      }
    };
  };
}
