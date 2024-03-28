import { IZLifecycleConnected, registerCustomElement } from '@zthun/spellcraft';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import sh from 'highlight.js/lib/languages/shell';
import ts from 'highlight.js/lib/languages/typescript';

export class ZSpellcraftCodeBlockElement extends HTMLElement implements IZLifecycleConnected {
  public constructor() {
    super();

    hljs.registerLanguage('typescript', ts);
    hljs.registerLanguage('shell', sh);
    hljs.registerLanguage('bash', bash);
  }

  public connectedCallback() {
    this.style.display = 'block';
    const code = this.querySelector('code');
    hljs.highlightElement(code || this);
  }
}

registerCustomElement('z-spellcraft-code-block', ZSpellcraftCodeBlockElement);
