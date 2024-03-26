/**
 * A web component that has an html template factory.
 */
export interface IZComponentTemplate {
  /**
   * Returns the current component html template.
   *
   * @returns
   *        The html of this component.  Should return
   *        undefined if there is no template.
   */
  template(): string | undefined;
}
