/**
 * A decorator for a node object which adds additional functionality for auto adding nodes and manipulating children.
 */
export class ZNode {
  /**
   * Initializes a new instance of this object.
   */
  public constructor(public node: Node) {}

  /**
   * Removes all children from the node.
   *
   * @returns
   *        This object.
   */
  public clear(): this {
    while (this.node.firstChild) {
      this.node.firstChild.remove();
    }

    return this;
  }

  /**
   * Adds a style node to the node given some css text.
   *
   * @param css -
   *        The css text to construct the style to.  If this
   *        is falsy, then no style element is added.
   *
   * @returns
   *        This object.
   */
  public styles(css: string | null | undefined): this {
    if (css) {
      const style = document.createElement('style');
      style.textContent = css;
      this.node.appendChild(style);
    }
    return this;
  }

  /**
   * Constructs an html template and adds the nodes to the node instance.
   *
   * @param html -
   *        The html text to construct the template from.  If this
   *        is falsy, then no template is constructed.
   *
   * @returns
   *        This object.
   */
  public template(html: string | null | undefined): this {
    if (html) {
      const template = document.createElement('template');
      template.innerHTML = html;
      this.node.appendChild(template.content.cloneNode(true));
    }

    return this;
  }
}
