import { IZLifecycleConnected, IZLifecycleConnectedMaybe } from '../lifecycle/lifecycle-connected.mjs';
import { ZComponentConstructor } from './component-constructor.mjs';

/**
 * The requirements for ZComponentClass targets.
 */
export type ZComponentClassRequirements = HTMLElement & IZLifecycleConnectedMaybe;

/**
 * Automatically applies one or more class names to the host element upon being connected.
 *
 * Generally, you shouldn't need this, but this is useful for directive style components
 * when you want to classify them under certain categories for testing purposes.
 *
 * @param className -
 *        The first class to apply.  Required.
 * @param others -
 *        Additional classes to apply to the host element.
 *
 * @returns
 *        A new class that extends the class target which adds the classes
 *        to the host element.
 *
 * @example
 * ```ts
 * @ZComponentRegister('z-fancy-component')
 * @ZComponentClass('ZFancyComponent-root')
 * export class FancyComponent extends HTMLElement { }
 * ```
 *
 * Outputs the following to the browser DOM.
 *
 * ```html
 * <z-fancy-component class="ZFancyComponent-root"></z-fancy-component>
 * ```
 */
export function ZComponentClass<TElement extends ZComponentClassRequirements>(className: string, ...others: string[]) {
  const classes = [className].concat(others);

  return (Target: ZComponentConstructor<TElement>): any => {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    class _ZComponentClass extends Target implements IZLifecycleConnected {
      connectedCallback(): void {
        super.connectedCallback?.call(this);
        classes.forEach((c) => this.classList.add(c));
      }
    }

    return _ZComponentClass;
  };
}
