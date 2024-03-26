/**
 * A web component that contains a render function.
 */
export interface IZComponentRender {
  /**
   * Renders the component's styles and template.
   *
   * @param node -
   *        The node to paint to for the component.
   */
  render(node: Node): void;
}

/**
 * A web component that has a css factory.
 */
export interface IZComponentStyles {
  /**
   * Returns the current component css styles.
   *
   * @returns
   *        The css of this component.  Should return
   *        undefined if there are no styles.
   */
  styles(): string | undefined;
}

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
