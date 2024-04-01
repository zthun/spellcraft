/**
 * The lifecycle event for when a component is moved to a new document.
 */
export interface IZLifecycleAdopted {
  /**
   * Occurs when a component moves to a new document.
   */
  adoptedCallback?(): void;
}
