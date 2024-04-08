import { ZNode } from '../node/node.mjs';
import { ZComponentConstructor } from './component-constructor.mjs';
import { IZComponentRender, IZComponentRenderMaybe } from './component-render.mjs';

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
  template(): string;
}

/**
 * Requirements for ZComponentRenderTemplate targets
 */
export type ZComponentRenderTemplateRequirements = HTMLElement & IZComponentTemplate & IZComponentRenderMaybe;

/**
 * An aspect that extends a component and adds a flow that renders a template
 * to the shadow root if it exists or directly under the host container if it does not contain
 * a shadow root.
 *
 * Note that rendering under the host container directly clears it of any child nodes.  If you
 * want to have child nodes, you MUST use a shadow root and have a slot somewhere inside of it.
 * In order for the component to actually render anything, it needs to implement
 * {@link IZComponentTemplate} and return a non-empty html string.
 *
 * Note that if you have multiples of these, it becomes last one wins and you will waste
 * cycles rendering extra templates that you will never see.
 *
 * @param TElement -
 *        The type of element that the decorator extends.
 *
 * @returns
 *        A new decorated type that automatically implements a render method that clears
 *        the target shadow root or target node and renders an html template.
 */
export function ZComponentRenderTemplate<TElement extends ZComponentRenderTemplateRequirements>() {
  return function (Target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    class _ZComponentRenderTemplate extends Target implements IZComponentRender {
      public render(node: Node) {
        super.render?.call(this, node);
        new ZNode(node).clear().template(this.template());
      }
    }

    return _ZComponentRenderTemplate;
  };
}
