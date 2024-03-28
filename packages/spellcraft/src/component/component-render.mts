import { IZLifecycleAttributeChanged } from '../lifecycle/lifecycle-attribute-changed.mjs';
import { IZLifecycleConnected } from '../lifecycle/lifecycle-connected.mjs';

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
 * Options for the render implementation.
 *
 * If this is a falsy object, then the default behavior
 * is to skip any rendering in the constructor, have the
 * first render be in the connected callback, and then render
 * on every attribute change and property change callback.
 */
export interface IZComponentRenderOptions {
  /**
   * Skip the render method in the connected lifecycle.
   */
  skipConnected?: boolean;

  /**
   * Skip the render method in the attribute changed lifecycle.
   */
  skipAttributeChanged?: boolean;
}

/**
 * A mixin decorator that adds a render invocation on the lifecycle events.
 *
 * In order for the component to actually render anything, it needs to implement
 * {@link IZComponentRender}. You can build a render function using additional
 * component render decorators, or implement your own.
 *
 * The target node for the render method will be the shadowRoot if it is set, or
 * will point to this object if there is no shadow root.
 *
 * @returns
 *        A new decorated type that automatically implements
 *        {@link IZLifecycleAttributeChanged}, {@link IZLifecycleConnected}
 *        and {@link IZPropertyChanged}.  Each method will invoke {@link IZComponentRender.render} unless
 *        the options specify to skip the target lifecycle event.
 */
export function ZComponentRender(options?: IZComponentRenderOptions) {
  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;
    const { skipConnected, skipAttributeChanged } = options || {};

    const K: any = class extends _Target implements IZLifecycleAttributeChanged, IZLifecycleConnected {
      __component_render(skip?: boolean) {
        if (!skip) {
          this.render?.call(this, this.shadowRoot || this);
        }
      }

      public connectedCallback() {
        super.connectedCallback?.call(this);
        this.__component_render(skipConnected);
      }

      public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback?.call(this, name, oldValue, newValue);
        this.__component_render(skipAttributeChanged);
      }
    };

    return K;
  };
}
