/**
 * The lifecycle event for when a component is moved to a new document.
 */
export interface IZLifecycleAdopted {
  /**
   * Occurs when a component moves to a new document.
   */
  adoptedCallback(): void;
}

/**
 * @see {@link IZLifecycleAdopted} -
 *      The event may or may not be implemented.
 */
export interface IZLifecycleAdoptedMaybe {
  /**
   * @see {@link IZLifecycleAdopted.adoptedCallback} -
   *      The implementation of this is optional.
   */
  adoptedCallback?(): void;
}
