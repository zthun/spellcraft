import { html } from '@zthun/helpful-fn';
import { ZComponentConstructor } from '../component/component-constructor.mjs';
import { IZComponentTemplate } from '../render/component-render-template.mjs';

/**
 * Requirements for ZComponentTemplateNoDisplay targets
 */
export type ZComponentTemplateNoDisplayRequirements = HTMLElement;

/**
 * An aspect that extends a component and adds a template member that basically amounts to
 * display: none with a slot.
 *
 * This will normally be used in background components which are only responsible for
 * supplying values to the host component.
 *
 * @param T -
 *        The type of element that the decorator extends.
 *
 * @returns
 *        A new decorated type that automatically implements a render method that clears
 *        the target shadow root or target node and renders an html template.
 */
export function ZComponentTemplateNoDisplay<T extends ZComponentTemplateNoDisplayRequirements>() {
  return function (Target: ZComponentConstructor<T>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentTemplateNoDisplay extends Target implements IZComponentTemplate {
      public template() {
        return html`
          <style>
            :host {
              display: none !important;
            }
          </style>
          <slot></slot>
        `;
      }
    };
  };
}
