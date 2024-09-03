/**
 * The lifecycle event for when a component's observed attributes have changed.
 */
export interface IZLifecycleAttributeChanged {
  /**
   * Occurs when a web component's observed attributes have changed.
   *
   * @param name -
   *        The name of the attribute.
   * @param oldValue -
   *        The old value of the attribute.
   * @param newValue -
   *        The new value of the attribute.
   */
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void;
}

/**
 * @see {@link IZLifecycleAttributeChanged} -
 *      The event may or may not be implemented.
 */
export interface IZLifecycleAttributeChangedMaybe {
  /**
   * @see {@link IZLifecycleAttributeChanged.attributeChangedCallback} -
   *      This implementation of this is optional.
   */
  attributeChangedCallback?(
    name: string,
    oldValue: string,
    newValue: string,
  ): void;
}
