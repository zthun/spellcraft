import { includeCustomElement } from '@zthun/spellcraft';
import { ZSpellcraftCardElement } from './card/card-element.mjs';
import { ZSpellcraftHeaderElement } from './header/header-element.mjs';
import { ZSpellcraftThemeElement } from './theme/spellcraft-theme-element.mjs';

includeCustomElement(ZSpellcraftThemeElement);
includeCustomElement(ZSpellcraftHeaderElement);
includeCustomElement(ZSpellcraftCardElement);
