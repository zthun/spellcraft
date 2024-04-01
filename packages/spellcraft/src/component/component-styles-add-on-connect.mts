import { IZLifecycleConnected, IZLifecycleConnectedMaybe } from '../lifecycle/lifecycle-connected.mjs';
import { ZComponentConstructor } from './component-constructor.mjs';
import { IZComponentStyles, IZComponentWithStyleElement } from './component-styles.mjs';

type DecoratorRequirements = HTMLElement & IZComponentWithStyleElement & IZComponentStyles & IZLifecycleConnectedMaybe;

/**
 * A component will auto add a stylesElement.
 *
 * @param options -
 *        The options for the style component.
 * @param TElement -
 *        The element with requirements for adding this decorator.
 *
 * @returns
 *        A new class that extends from the target class that adds a new property,
 *        styleElement
 */
export function ZComponentStylesAddOnConnect<TElement extends DecoratorRequirements>() {
  return function (target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    class _ZComponentStylesAddOnConnect extends target implements Required<IZLifecycleConnected> {
      public connectedCallback(): void {
        super.connectedCallback?.call(this);
        this.refreshStyles(this.styles());
      }
    }

    return _ZComponentStylesAddOnConnect;
  };
}
