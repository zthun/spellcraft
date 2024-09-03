/**
 * An event for when a property changes.
 */
export interface IZLifecyclePropertyChanged {
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
  propertyChangedCallback(
    name: string | symbol,
    oldValue: any,
    newValue: any,
  ): void;
}

/**
 * An event for when a property changes.
 */
export interface IZLifecyclePropertyChangedMaybe {
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
  propertyChangedCallback?(
    name: string | symbol,
    oldValue: any,
    newValue: any,
  ): void;
}
