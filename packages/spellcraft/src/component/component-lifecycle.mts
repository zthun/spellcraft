/**
 * The lifecycle event for when a component is inserted into the DOM.
 */
export interface IZComponentConnected {
  /**
   * Invoked when a web component is inserted into the DOM.
   */
  connectedCallback(): void;
}

/**
 * The lifecycle event for when a component is removed from the DOM.
 */
export interface IZComponentDisconnected {
  /**
   * Invoked when a web component is removed from the dom.
   */
  disconnectedCallback(): void;
}

/**
 * The lifecycle event for when a component's observed attributes have changed.
 */
export interface IZComponentAttributeChanged {
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
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

/**
 * The lifecycle event for when a component is moved to a new document.
 */
export interface IZComponentAdopted {
  /**
   * Occurs when a component moves to a new document.
   */
  adoptedCallback(): void;
}
