import { html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it } from 'vitest';
import { ZNode } from '../node/node.mjs';
import { ZComponentRegister } from './component-register.mjs';

describe('ZComponentRegister', () => {
  const $tag = 'z-component-register-test';

  afterEach(() => {
    new ZNode(document.body).clear();
  });

  @ZComponentRegister($tag)
  @ZComponentRegister($tag)
  @ZComponentRegister($tag)
  class ZComponentRegisterTest extends HTMLElement {}

  const createTestTarget = () => {
    const $html = html`<div><${$tag}></${$tag}></div>`;
    const template = document.createElement('template');
    template.innerHTML = $html;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentRegisterTest>($tag);
  };

  it('should render the test component', () => {
    // Arrange.
    // Act.
    const target = createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
