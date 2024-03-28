import { IZComponentRender } from './component-render.mjs';

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

/**
 * A mixin decorator that extends a WebComponent and adds a flow that renders a template
 * to the shadow root if it exists or directly under the host container if it does not contain
 * a shadow root.
 *
 * In order for the component to actually render anything, it needs to implement
 * {@link IZComponentTemplate} and return a non-empty html string.
 *
 * @returns
 *        A new decorated type that automatically implements
 *        {@link IZLifecycleAttributeChanged} and {@link IZLifecycleConnected}
 *        and {@link IZPropertyChanged} and invokes the {@link IZComponentTemplate.template} method
 *        if it exists when it renders.
 */
export function ZComponentRenderTemplate() {
  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;

    const K: any = class extends _Target implements IZComponentRender {
      _fragment: HTMLElement | null;

      public render(node: Node) {
        super.render?.call(this, node);

        this._fragment?.remove();
        this._fragment = document.createElement('span');

        const $html = this.template?.call(this);

        if ($html) {
          const template = document.createElement('template');
          template.innerHTML = $html;
          this._fragment.appendChild(template.content.cloneNode(true));
        }

        node.appendChild(this._fragment);
      }
    };

    return K;
  };
}
