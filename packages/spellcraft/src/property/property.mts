import { kebabCase } from 'lodash-es';
import { ZAttributes } from '../attribute/attributes.mjs';
import { IZLifecyclePropertyChangedMaybe } from '../lifecycle/lifecycle-property-changed.mjs';

/**
 * The requirements for a ZProperty target
 */
export type ZPropertyRequirements = HTMLElement & IZLifecyclePropertyChangedMaybe;

/**
 * Options for a web component property.
 */
export interface ZPropertyOptions {
  /**
   * The initial value.
   */
  initial?: any;

  /**
   * Tells the property to add a data attribute.
   *
   * This only apples to object targets that implement Element.
   */
  attribute?: true | ((v?: any) => string | undefined);
}

/**
 * A decorator factory that marks a HTMLElement member as a property.
 *
 * If the target class containing the property implements IZComponentPropertyChanged,
 * then this will invoke that property.
 *
 * @param options -
 *        Options for the property.
 *
 * @returns
 *        The property decorator which wraps a property to invoke the
 *        property change event when it changes.
 */
export function ZProperty<C extends ZPropertyRequirements>(options?: ZPropertyOptions): PropertyDecorator {
  return (target: C, propertyKey: string | symbol): void => {
    const attribute = options?.attribute || undefined;

    let _value = options?.initial;

    function get() {
      return _value;
    }

    function set(this: C, newValue: any) {
      const oldValue = _value;
      _value = newValue;

      if (oldValue !== newValue) {
        this.propertyChangedCallback?.call(this, propertyKey, oldValue, newValue);
      }

      if (attribute) {
        const name = `data-${kebabCase(propertyKey.toString())}`;
        const value =
          typeof attribute === 'function'
            ? attribute(newValue)
            : typeof newValue === 'string'
              ? newValue
              : JSON.stringify(newValue);
        ZAttributes.mutate(this, name, value);
      }
    }

    Object.defineProperty(target, propertyKey, {
      get,
      set
    });
  };
}
