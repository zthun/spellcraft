import { kebabCase } from 'lodash-es';
import { ZAttributes } from '../attribute/attributes.mjs';
import { implementsPropertyChanged } from './property-changed.mjs';

/**
 * Options for a web component property.
 */
export interface ZPropertyOptions<V> {
  /**
   * The initial value.
   */
  initial?: V;

  /**
   * Tells the property to add a data attribute.
   *
   * This only apples to object targets that implement Element.
   */
  attribute?: true | ((v?: V) => string | undefined);
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
export function ZProperty<V>(options?: ZPropertyOptions<V>): PropertyDecorator {
  function implementsSetAttribute(x: any): x is Element {
    return typeof x.setAttribute === 'function';
  }

  return <C extends HTMLElement>(target: C, propertyKey: string | symbol): void => {
    const attribute = options?.attribute || undefined;

    let _value: V = options?.initial as V;

    function get() {
      return _value;
    }

    function set(this: C, newValue: V) {
      const oldValue = _value;
      _value = newValue;

      if (implementsPropertyChanged(this) && oldValue !== newValue) {
        this.propertyChangedCallback(propertyKey, oldValue, newValue);
      }

      if (attribute && implementsSetAttribute(target)) {
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
