/**
 * The callback function type for an object that supports a PropertyChanged event.
 */
export type ZPropertyChangedCallbackFunction = (name: string | symbol, oldValue: any, newValue: any) => void;

/**
 * An event for when a property changes.
 */
export interface IZPropertyChanged {
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
export function implementsPropertyChanged(x: any): x is IZPropertyChanged {
  return typeof x.propertyChangedCallback === 'function';
}
