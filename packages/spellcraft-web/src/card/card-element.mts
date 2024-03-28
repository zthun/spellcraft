import { css, html } from '@zthun/helpful-fn';
import { ZComponentShadow } from '@zthun/spellcraft';

@ZComponentShadow({ name: 'ZSpellcraftCard' })
export class ZSpellcraftCardElement extends HTMLElement {
  public styles() {
    const borderRadius = 'var(--rounding-xs)';

    return css`
      :host {
        display: block;
        box-shadow: var(--color-surface-shadow);
      }

      ::slotted([slot='title']),
      ::slotted([slot='subtitle']) {
        margin: 0;
      }

      ::slotted([slot='avatar']) {
        font-size: 1.75rem;
        margin-right: var(--gap-sm);
      }

      ::slotted([slot='title']) {
        grid-area: title;
      }

      ::slotted([slot='subtitle']) {
        grid-area: subtitle;
      }

      ::slotted([slot='avatar']) {
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
        border-top-left-radius: ${borderRadius};
        border-top-right-radius: ${borderRadius};
        display: grid;
        grid-template-columns: auto 1fr;
        margin: 0;
        min-height: 1rem;
        padding: var(--gap-sm);

        grid-template-areas:
          'avatar title'
          'avatar subtitle';
      }

      article {
        padding: var(--gap-md);
        border-bottom: none;
        border-top: none;
      }

      footer {
        border-top: none;
        border-bottom-left-radius: ${borderRadius};
        border-bottom-right-radius: ${borderRadius};
        min-height: 1rem;
      }
    `;
  }

  public template() {
    return html`
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
