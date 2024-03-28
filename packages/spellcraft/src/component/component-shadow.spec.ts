import { html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it } from 'vitest';
import { ZNode } from '../node/node.mjs';
import { ZComponentRegister } from './component-register.mjs';
import { ZComponentShadow } from './component-shadow.mjs';

describe('ZComponentShadow', () => {
  const $tag = 'z-component-shadow-test';

  @ZComponentRegister($tag)
  @ZComponentShadow()
  @ZComponentShadow()
  class ZComponentShadowTest extends HTMLElement {}

  afterEach(() => {
    new ZNode(document.body).clear();
  });

  const createTestTarget = () => {
    const template = document.createElement('template');
    template.innerHTML = html`<div><${$tag}></${$tag}></div>`;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentShadowTest>($tag)!;
  };

  it('should add an open shadow root', () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    const actual = target.shadowRoot;
    // Assert.
    expect(actual).not.toBeNull();
  });
});
