/**
 * A decorator for a Node object which adds additional functionality for auto adding nodes and manipulating children.
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
   * Constructs an html template elements and adds the content fragment
   * clone to the node.
   *
   * @param html -
   *        The html text to construct the template from.  If this
   *        is falsy, then no template is constructed.
   *
   * @returns
   *        This object.
   */
  public template(html: string): this {
    const template = document.createElement('template');
    template.innerHTML = html;
    this.node.appendChild(template.content.cloneNode(true));
    return this;
  }
}
