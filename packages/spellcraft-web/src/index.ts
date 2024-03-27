import { includeCustomElement } from '@zthun/spellcraft';
import { ZSpellcraftCardElement } from './card/card-element';
import { ZSpellcraftHeaderElement } from './header/header-element';
import { ZSpellcraftThemeElement } from './theme/spellcraft-theme-element';

includeCustomElement(ZSpellcraftThemeElement);
includeCustomElement(ZSpellcraftHeaderElement);
includeCustomElement(ZSpellcraftCardElement);
