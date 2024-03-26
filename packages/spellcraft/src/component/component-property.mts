import { kebabCase } from 'lodash-es';
import { mutateAttribute } from '../attribute/mutate-attribute.mjs';

/**
 * The callback function type for an object that supports a PropertyChanged event.
 */
export type ZPropertyChangedCallbackFunction = (name: string | symbol, oldValue: any, newValue: any) => void;

/**
 * An event for when a property changes.
 */
export interface IZComponentPropertyChanged {
  /**
   * Occurs when a property declared with the {@link ZProperty} decorator changes it's value.
   *
   * @param name -
   *        The name of the property.
   * @param oldValue -
   *        The old value of the property.
   * @param newValue -
   *        The new value of the property.
   */
  propertyChangedCallback(name: string | symbol, oldValue: any, newValue: any): void;
}

/**
 * Gets whether an object implements an IZComponentPropertyChanged.
 *
 * @param x -
 *        The object to check
 *
 * @returns
 *        True if x implements the property change callback interface.
 *        False otherwise.
 */
export function implementsPropertyChanged(x: any): x is IZComponentPropertyChanged {
  return typeof x.propertyChangedCallback === 'function';
}

/**
 * Gets whether an object can have attributes set to it.
 *
 * @param x -
 *        The object to check.
 *
 * @returns
 *        True if x implements a setAttribute method. False otherwise.
 */
export function implementsSetAttribute(x: any): x is Element {
  return typeof x.setAttribute === 'function';
}

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
        mutateAttribute(this, name, value);
      }
    }

    Object.defineProperty(target, propertyKey, {
      get,
      set
    });
  };
}
