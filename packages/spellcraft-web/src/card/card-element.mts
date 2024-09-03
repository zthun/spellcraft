import { html } from "@zthun/helpful-fn";
import {
  IZComponentRender,
  IZComponentTemplate,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow,
} from "@zthun/spellcraft";

export interface ZSpellcraftCardElement extends IZComponentRender {}

@ZComponentRegister("z-spellcraft-card")
@ZComponentRenderTemplate()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentShadow()
export class ZSpellcraftCardElement
  extends HTMLElement
  implements IZComponentTemplate
{
  public template() {
    return html`
      <style>
        :host {
          box-shadow: var(--color-surface-shadow);
          display: block;
          margin-bottom: var(--gap-md);
        }

        ::slotted([slot="title"]),
        ::slotted([slot="subtitle"]) {
          margin: 0;
        }

        ::slotted([slot="avatar"]) {
          font-size: 1.75rem;
          margin-right: var(--gap-sm);
        }

        ::slotted([slot="title"]) {
          grid-area: title;
        }

        ::slotted([slot="subtitle"]) {
          grid-area: subtitle;
        }

        ::slotted([slot="avatar"]) {
          grid-area: avatar;
        }

        .ZSpellcraftCard-container {
          border:;
          border-radius: var(--rounding-xs);
        }

        header,
        article,
        footer {
          border: var(--thickness-xs) solid var(--color-surface-border);
          background-color: var(--color-surface-main);
          color: var(--color-surface-contrast);
        }

        header {
          align-items: center;
          border: var(--thickness-xs) solid var(--color-surface-border);
          border-top-left-radius: var(--rounding-xs);
          border-top-right-radius: var(--rounding-xs);
          display: grid;
          grid-template-columns: auto 1fr;
          margin: 0;
          min-height: 1rem;
          padding: var(--gap-sm);

          grid-template-areas:
            "avatar title"
            "avatar subtitle";
        }

        article {
          padding: var(--gap-md);
          border-bottom: none;
          border-top: none;
        }

        footer {
          border-top: none;
          border-bottom-left-radius: var(--rounding-xs);
          border-bottom-right-radius: var(--rounding-xs);
          min-height: 1rem;
        }
      </style>
      <header class="ZSpellcraftCard-header">
        <slot name="avatar"></slot>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </header>
      <article class="ZSpellcraftCard-body">
        <slot name="body"></slot>
      </article>
      <footer class="ZSpellcraftCard-footer">
        <slot name="footer"></slot>
      </footer>
    `;
  }
}
