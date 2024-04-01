/**
 * A web component that can be rendered
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
 * A web component that may support rendering.
 */
export interface IZComponentRenderMaybe {
  /**
   * See {@link IZComponentRender}.
   */
  render?(node: Node): void;
}
