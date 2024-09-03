import { html } from "@zthun/helpful-fn";
import { ZComponentConstructor } from "../component/component-constructor.mjs";
import { IZComponentTemplate } from "../render/component-render-template.mjs";

/**
 * Requirements for ZComponentTemplateSlot targets
 */
export type ZComponentTemplateSlotRequirements = HTMLElement;

/**
 * An aspect that extends a component and adds a template member that adds a slot
 * component.
 *
 * This is mostly useful for testing.
 *
 * @param T -
 *        The type of element that the decorator extends.
 *
 * @returns
 *        A new decorated type that automatically implements a render method that clears
 *        the target shadow root or target node and renders an html template.
 */
export function ZComponentTemplateSlot<
  T extends ZComponentTemplateSlotRequirements,
>() {
  return function (Target: ZComponentConstructor<T>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentTemplateSlot
      extends Target
      implements IZComponentTemplate
    {
      public template() {
        return html`<slot></slot>`;
      }
    };
  };
}
