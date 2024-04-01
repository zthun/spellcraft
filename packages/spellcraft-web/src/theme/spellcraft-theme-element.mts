/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { css } from '@zthun/helpful-fn';
import {
  IZComponentStyles,
  IZComponentWithStyleElement,
  ZComponentRegister,
  ZComponentStyles,
  ZComponentStylesAddOnConnect
} from '@zthun/spellcraft';

export interface ZSpellcraftThemeElement extends IZComponentWithStyleElement {}

@ZComponentRegister('z-spellcraft-theme')
@ZComponentStylesAddOnConnect()
@ZComponentStyles()
export class ZSpellcraftThemeElement extends HTMLElement implements IZComponentStyles {
  public styles() {
    return css`
      html {
        --color-body-main: #303030;
        --color-body-contrast: #fff;

        --color-surface-main: #424242;
        --color-surface-contrast: #fff;
        --color-surface-border: #686868;
        --color-surface-shadow: 0.016rem 0.187rem 0.25rem 0.125rem #1a1a1a;

        --color-primary-main: #4f1790;
        --color-primary-contrast: #fff;

        --color-secondary-main: #4654a8;
        --color-secondary-contrast: #fff;

        --gap-xs: 0.5rem;
        --gap-sm: 1rem;
        --gap-md: 1.5rem;
        --gap-lg: 2rem;
        --gap-xl: 2.5rem;

        --thickness-xs: 1px;
        --thickness-sm: 2px;
        --thickness-md: 3px;
        --thickness-lg: 0.25rem;
        --thickness-xl: 0.5rem;

        --rounding-xs: 5px;
        --rounding-sm: 1rem;
        --rounding-md: 1.25rem;
        --rounding-lg: 1.5rem;
        --rounding-xl: 50%;
      }

      body {
        background-color: var(--color-body-main);
        color: var(--color-body-contrast);
        padding: 0;
        margin: 0;
        height: 100vh;

        font-family: 'Roboto';
      }

      a {
        color: inherit;
      }

      a:hover {
        color: var(--color-body-contrast);
      }

      .ZSpellcraft-page {
        padding: var(--gap-xl);
      }
    `;
  }
}
