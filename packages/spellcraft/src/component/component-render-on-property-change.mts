import {
  IZLifecyclePropertyChanged,
  IZLifecyclePropertyChangedMaybe
} from '../lifecycle/lifecycle-property-changed.mjs';
import { ZComponentConstructor } from './component-constructor.mjs';
import { IZComponentRender } from './component-render.mjs';

/**
 * Requirements for ZComponentRenderOnAttributeChanged targets.
 */
export type ZComponentRenderOnPropertyChangeRequirements = HTMLElement &
  IZComponentRender &
  IZLifecyclePropertyChangedMaybe;

/**
 * An aspect that adds a render invocation on the property changed
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
 *        A new decorated type that automatically implements {@link IZLifecyclePropertyChanged}.
 *        Each method will invoke {@link IZComponentRender.render} unless
 *        the options specify to skip the target lifecycle event.
 *
 * @example
 * ```ts
 * @ZComponentRegister('z-fancy-component')
 * @ZComponentRenderOnPropertyChange()
 * @ZComponentShadow()
 * export class ZFancyComponent extends HTMLElement implements IZComponentRender {
 *
 *     @ZProperty()
 *     public fancy: number;
 *
 *     public render() {
 *         console.log('I have rendered when any property changes');
 *     }
 * }
 * ```
 */
export function ZComponentRenderOnPropertyChanged<TElement extends ZComponentRenderOnPropertyChangeRequirements>() {
  return function (Target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentRenderOnPropertyChanged extends Target implements IZLifecyclePropertyChanged {
      public propertyChangedCallback(name: string, oldValue: any, newValue: any) {
        super.propertyChangedCallback?.call(this, name, oldValue, newValue);
        this.render(this.shadowRoot || this);
      }
    };
  };
}
