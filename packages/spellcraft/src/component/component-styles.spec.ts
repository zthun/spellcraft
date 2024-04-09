import { css, html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it } from 'vitest';
import { ZAttribute } from '../attribute/attribute.mjs';
import { ZNode } from '../node/node.mjs';
import { ZProperty } from '../property/property.mjs';
import { ZComponentRegister } from './component-register.mjs';
import { ZComponentStylesAddOnConnect } from './component-styles-add-on-connect.mjs';
import { ZComponentStylesRemoveOnDisconnect } from './component-styles-remove-on-disconnect.mjs';
import { ZComponentStylesUpdateOnAttributeChange } from './component-styles-update-on-attribute-change.mjs';
import { ZComponentStylesUpdateOnPropertyChange } from './component-styles-update-on-property-change.mjs';
import { IZComponentStyles, IZComponentWithStyleElement, ZComponentStyles } from './component-styles.mjs';

describe('ZComponentStyles', () => {
  const id = 'ZComponentStylesTest-root';
  const selector = `#${id}`;
  const tag = 'z-component-styles-test';

  interface ZComponentStylesTest extends IZComponentWithStyleElement {}

  @ZComponentRegister(tag)
  @ZComponentStylesRemoveOnDisconnect()
  @ZComponentStylesUpdateOnPropertyChange()
  @ZComponentStylesUpdateOnAttributeChange()
  @ZComponentStylesAddOnConnect()
  @ZComponentStyles({ id })
  class ZComponentStylesTest extends HTMLElement implements IZComponentStyles {
    public static readonly observedAttributes = Object.freeze(['color']);

    @ZAttribute({ fallback: 'green' })
    public color: 'green' | 'blue';

    @ZProperty({ initial: 'left' })
    public align: string;

    public styles() {
      return css`
        html {
          --color: ${this.color};
          --align: ${this.align};
        }
      `;
    }
  }

  afterEach(() => {
    new ZNode(document.body).clear();
    new ZNode(document.head).clear();
  });

  const createTestTarget = () => {
    const template = document.createElement('template');
    template.innerHTML = html`
      <div>
        <${tag}></${tag}>
        <${tag}></${tag}>
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

  it('should update the inner text of the style on an attribute change', () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    target.color = 'blue';
    const actual = document.head.querySelector(selector);
    // Assert.
    expect(actual?.textContent).toContain('--color: blue');
  });

  it('should update the inner text of the style on an property change', () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    target.align = 'center';
    const actual = document.head.querySelector(selector);
    // Assert.
    expect(actual?.textContent).toContain('--align: center');
  });

  it('should remove the style on disconnect', () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    target.remove();
    const actual = document.head.querySelector(selector);
    // Assert.
    expect(actual).toBeFalsy();
  });
});
