import { ZComponentConstructor } from '../component/component-constructor.mjs';
import {
  IZLifecyclePropertyChanged,
  IZLifecyclePropertyChangedMaybe
} from '../lifecycle/lifecycle-property-changed.mjs';
import { IZComponentStyles, IZComponentWithStyleElement } from './component-styles.mjs';

/**
 * Requirements for ZComponentStylesUpdateOnAttributeChange targets.
 */
export type ZComponentStylesUpdateOnPropertyChangeRequirements = HTMLElement &
  IZComponentWithStyleElement &
  IZComponentStyles &
  IZLifecyclePropertyChangedMaybe;

/**
 * An aspect will update the style element when a property changes.
 *
 * @param T -
 *        The element with requirements for adding this decorator.
 *
 * @returns
 *        A new class that extends from the target class that updates the style element
 *        when a property changes.
 */
export function ZComponentStylesUpdateOnPropertyChange<T extends ZComponentStylesUpdateOnPropertyChangeRequirements>() {
  return function (target: ZComponentConstructor<T>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    class _ZComponentStylesUpdateOnPropertyChange extends target implements IZLifecyclePropertyChanged {
      public propertyChangedCallback(name: string, oldValue: any, newValue: any): void {
        super.propertyChangedCallback?.call(this, name, oldValue, newValue);
        this.refreshStyles(this.styles());
      }
    }

    return _ZComponentStylesUpdateOnPropertyChange;
  };
}
