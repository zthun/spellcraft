import { html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it } from 'vitest';
import { ZNode } from '../node/node.mjs';
import { ZComponentClass } from './component-class.mjs';
import { ZComponentRegister } from './component-register.mjs';

describe('ZComponentClass', () => {
  const $tag = 'z-component-class-test';
  const $class = 'ZComponentClassTest-root';
  const $subclass = 'ZComponentClassTest-more';

  afterEach(() => {
    new ZNode(document.body).clear();
  });

  @ZComponentRegister($tag)
  @ZComponentClass($class, $subclass)
  class ZComponentClassTest extends HTMLElement {}

  const createTestTarget = () => {
    const $html = html`<div><${$tag}></${$tag}></div>`;
    const template = document.createElement('template');
    template.innerHTML = $html;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentClassTest>($tag);
  };

  it('should add all classes to the output element', () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    const actual = target?.classList;
    // Assert.
    expect(actual?.contains($class)).toBeTruthy();
    expect(actual?.contains($subclass)).toBeTruthy();
  });
});
