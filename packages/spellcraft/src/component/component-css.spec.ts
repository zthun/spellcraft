import { css, html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it } from 'vitest';
import { ZNode } from '../node/node.mjs';
import { ZComponentCss } from './component-css.mjs';
import { ZComponentRegister } from './component-register.mjs';
import { IZComponentWithStyleElement } from './component-styles.mjs';

describe('ZComponentCss', () => {
  const id = 'ZComponentCss-test-root';
  const selector = `#${id}`;
  const tag = 'z-component-shadow-test';

  interface ZComponentStylesTest extends IZComponentWithStyleElement {}

  @ZComponentRegister(tag)
  @ZComponentCss(
    css`
      :host {
        --color: red;
      }
    `,
    { id }
  )
  @ZComponentCss(
    css`
      :host {
        --color: green;
      }
    `,
    { id }
  )
  class ZComponentStylesTest extends HTMLElement {}

  afterEach(() => {
    new ZNode(document.body).clear();
    new ZNode(document.head).clear();
  });

  const createTestTarget = () => {
    const template = document.createElement('template');
    template.innerHTML = html`
      <div>
        <${tag}></${tag}>
      </div>
    `;
    document.body.appendChild(template.content.cloneNode(true));
    return document.body.querySelector<ZComponentStylesTest>(tag)!;
  };

  it('should add one styles element to the head', () => {
    // Arrange.
    createTestTarget();
    // Act.
    const actual = document.head.querySelectorAll(selector);
    // Assert.
    expect(actual.length).toEqual(1);
    expect(actual[0].nodeName).toEqual('STYLE');
  });

  it('should set the inner text of the style', () => {
    // Arrange.
    createTestTarget();
    // Act.
    const actual = document.head.querySelector(selector);
    // Assert.
    expect(actual?.textContent).toContain('--color: green');
  });
});
