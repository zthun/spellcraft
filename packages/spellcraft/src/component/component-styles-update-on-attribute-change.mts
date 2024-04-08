import {
  IZLifecycleAttributeChanged,
  IZLifecycleAttributeChangedMaybe
} from '../lifecycle/lifecycle-attribute-changed.mjs';
import { ZComponentConstructor } from './component-constructor.mjs';
import { IZComponentStyles, IZComponentWithStyleElement } from './component-styles.mjs';

/**
 * Requirements for ZComponentStylesUpdateOnAttributeChange targets.
 */
export type ZComponentStylesUpdateOnAttributeChangeRequirements = HTMLElement &
  IZComponentWithStyleElement &
  IZComponentStyles &
  IZLifecycleAttributeChangedMaybe;

/**
 * An aspect will update the style element when an attribute changes.
 *
 * @param TElement -
 *        The element with requirements for adding this decorator.
 *
 * @returns
 *        A new class that extends from the target class that adds a new property,
 *        styleElement
 */
export function ZComponentStylesUpdateOnAttributeChange<
  TElement extends ZComponentStylesUpdateOnAttributeChangeRequirements
>() {
  return function (target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    class _ZComponentStylesUpdateOnAttributeChange extends target implements IZLifecycleAttributeChanged {
      public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback?.call(this, name, oldValue, newValue);
        this.refreshStyles(this.styles());
      }
    }

    return _ZComponentStylesUpdateOnAttributeChange;
  };
}
