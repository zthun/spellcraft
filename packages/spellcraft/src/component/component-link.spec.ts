import { html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it } from 'vitest';
import { ZNode } from '../node/node.mjs';
import { ZComponentLink } from './component-link.mjs';
import { ZComponentRegister } from './component-register.mjs';

describe('ZComponentLink', () => {
  const tag = 'z-component-link-test';
  const href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';

  interface ZComponentLinkTest {}

  @ZComponentRegister(tag)
  @ZComponentLink('icon', href)
  @ZComponentLink('stylesheet', href)
  @ZComponentLink('stylesheet', href)
  class ZComponentLinkTest extends HTMLElement {}

  afterEach(() => {
    new ZNode(document.body).clear();
    new ZNode(document.head).clear();
  });

  const createTestTarget = () => {
    const template = document.createElement('template');
    template.innerHTML = html`<${tag}></${tag}>`;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentLinkTest>(tag)!;
  };

  it('should add one link element to the head', () => {
    // Arrange.
    createTestTarget();
    const selector = `link[rel="stylesheet"][href="${href}"]`;
    // Act.
    const actual = document.head.querySelectorAll(selector);
    // Assert.
    expect(actual.length).toEqual(1);
    expect(actual[0].nodeName).toEqual('LINK');
  });

  it('should match on both the rel and href', () => {
    // Arrange.
    createTestTarget();
    const selector = `link[href="${href}"]`;
    // Act.
    const actual = document.head.querySelectorAll(selector);
    // Assert.
    expect(actual.length).toEqual(2);
  });
});
