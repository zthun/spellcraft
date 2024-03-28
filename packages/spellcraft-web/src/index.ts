import { includeCustomElement } from '@zthun/spellcraft';
import { ZSpellcraftCardElement } from './card/card-element.mjs';
import { ZSpellcraftCodeBlockElement } from './code-block/code-block-element.mjs';
import { ZSpellcraftHeaderElement } from './header/header-element.mjs';
import { ZSpellcraftThemeElement } from './theme/spellcraft-theme-element.mjs';

import 'highlight.js/styles/github-dark.css';

includeCustomElement(ZSpellcraftThemeElement);
includeCustomElement(ZSpellcraftHeaderElement);
includeCustomElement(ZSpellcraftCardElement);
includeCustomElement(ZSpellcraftCodeBlockElement);
