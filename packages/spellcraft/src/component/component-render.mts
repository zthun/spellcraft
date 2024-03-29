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
