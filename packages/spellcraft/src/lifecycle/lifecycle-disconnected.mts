/**
 * The lifecycle event for when a component is removed from the DOM.
 */
export interface IZLifecycleDisconnected {
  /**
   * Invoked when a web component is removed from the dom.
   */
  disconnectedCallback?(): void;
}
