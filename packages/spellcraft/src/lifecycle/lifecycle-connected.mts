/**
 * The lifecycle event for when a component is inserted into the DOM.
 */
export interface IZLifecycleConnected {
  /**
   * Invoked when a web component is inserted into the DOM.
   */
  connectedCallback(): void;
}

/**
 * @see {@link IZLifecycleConnected} -
 *      The event may or may not be implemented.
 */
export interface IZLifecycleConnectedMaybe {
  /**
   * @see {@link IZLifecycleConnected.connectedCallback} -
   *      The implementation of this is optional.
   */
  connectedCallback?(): void;
}
