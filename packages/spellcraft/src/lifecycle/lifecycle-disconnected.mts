/**
 * The lifecycle event for when a component is removed from the DOM.
 */
export interface IZLifecycleDisconnected {
  /**
   * Invoked when a web component is removed from the dom.
   */
  disconnectedCallback(): void;
}

/**
 * @see {@link IZLifecycleDisconnected} -
 *      The event may or may not be implemented.
 */
export interface IZLifecycleDisconnectedMaybe {
  /**
   * @see {@link IZLifecycleDisconnected.disconnectedCallback} -
   *      The implementation of this is optional.
   */
  disconnectedCallback?(): void;
}
