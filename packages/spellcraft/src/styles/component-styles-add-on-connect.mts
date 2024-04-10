import { ZComponentConstructor } from '../component/component-constructor.mjs';
import { IZLifecycleConnected, IZLifecycleConnectedMaybe } from '../lifecycle/lifecycle-connected.mjs';
import { IZComponentStyles, IZComponentWithStyleElement } from './component-styles.mjs';

/**
 * Requirements for ZComponentStylesAddOnConnect targets.
 */
export type ZComponentStylesAddOnConnectRequirements = HTMLElement &
  IZComponentWithStyleElement &
  IZComponentStyles &
  IZLifecycleConnectedMaybe;

/**
 * An aspect that will auto add a stylesElement when the component is connected to the DOM.
 *
 * @param TElement -
 *        The element with requirements for adding this decorator.
 *
 * @returns
 *        A new class that extends from the target class that adds a new property,
 *        styleElement
 */
export function ZComponentStylesAddOnConnect<TElement extends ZComponentStylesAddOnConnectRequirements>() {
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
