/**
 * The lifecycle event for when a component is inserted into the DOM.
 */
export interface IZLifecycleConnected {
  /**
   * Invoked when a web component is inserted into the DOM.
   */
  connectedCallback(): void;
}
