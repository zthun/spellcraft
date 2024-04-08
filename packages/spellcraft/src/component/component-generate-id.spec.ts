import { html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it } from 'vitest';
import { ZNode } from '../node/node.mjs';
import { ZComponentGenerateId } from './component-generate-id.mjs';
import { ZComponentRegister } from './component-register.mjs';

describe('ZComponentGenerateId', () => {
  const $tag = 'z-component-generate-id-test';

  afterEach(() => {
    new ZNode(document.body).clear();
  });

  @ZComponentRegister($tag)
  @ZComponentGenerateId()
  class ZComponentGenerateIdTest extends HTMLElement {}

  const createTestTarget = () => {
    const $html = html`<div><${$tag}></${$tag}></div>`;
    const template = document.createElement('template');
    template.innerHTML = $html;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentGenerateIdTest>($tag);
  };

  it('should generate an id on the target', () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    const actual = target?.id;
    // Assert.
    expect(actual).toBeTruthy();
  });
});
