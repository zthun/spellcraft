/**
 * Options for painting a node.
 */
export interface IZNodePaintOptions {
  /**
   * The css to append to a style element.
   */
  css?: string;
  /**
   * The html to append as a template.
   */
  html?: string;
}

/**
 * Clears and paints css styles and html to a node root.
 *
 * This is most useful when painting to the shadow dom.  If both css and
 * html are falsy, then this acts as a clear node which removes all
 * child elements from it.
 *
 * @param node -
 *        The node to paint onto.
 * @param options -
 *        The options for painting.
 */
export function nodePaint(node: Node, options?: IZNodePaintOptions) {
  while (node.firstChild) {
    node.firstChild.remove();
  }

  if (options?.css) {
    const style = document.createElement('style');
    style.textContent = options.css;
    node.appendChild(style);
  }

  if (options?.html) {
    const template = document.createElement('template');
    template.innerHTML = options.html;
    node.appendChild(template.content.cloneNode(true));
  }
}
