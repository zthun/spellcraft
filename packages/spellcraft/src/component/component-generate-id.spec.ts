import { createGuid, html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZNode } from '../node/node.mjs';
import { ZComponentGenerateId } from './component-generate-id.mjs';
import { ZComponentRegister } from './component-register.mjs';

describe('ZComponentGenerateId', () => {
  afterEach(() => {
    new ZNode(document.body).clear();
  });

  const shouldGenerateAnIdOnTheTarget = <T extends HTMLElement>(createTestTarget: () => T | null) => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    const actual = target?.id;
    // Assert.
    expect(actual?.length).toBeGreaterThan(0);
  };

  const shouldKeepIdIfItAlreadyExists = <T extends HTMLElement>(createTestTarget: (id: string) => T | null) => {
    // Arrange.
    const expected = `e-${createGuid()}`;
    const target = createTestTarget(expected);
    // Act.
    const actual = target?.id;
    // Assert.
    expect(actual).toEqual(expected);
  };

  describe('Custom Element Flow', () => {
    const tag = 'z-component-generate-id-test';

    @ZComponentRegister(tag)
    @ZComponentGenerateId()
    class ZComponentGenerateIdTest extends HTMLElement {
      public $connectedCallback = vi.fn();

      public connectedCallback() {
        this.$connectedCallback();
      }
    }

    const createTestTarget = (id?: string) => {
      const $html = html`<${tag} id="${id || ''}"></${tag}>`;
      const template = document.createElement('template');
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentGenerateIdTest>(tag);
    };

    it('should generate an id on the target', () => {
      shouldGenerateAnIdOnTheTarget(createTestTarget);
    });

    it('should keep the id if it already exists', () => {
      shouldKeepIdIfItAlreadyExists(createTestTarget);
    });

    it('should invoke the parent connected callback', () => {
      // Arrange.
      // Act.
      const target = createTestTarget();
      // Assert.
      expect(target?.$connectedCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Directive Flow', () => {
    const tag = 'z-component-directive-id-test';

    @ZComponentRegister(tag, { extend: 'div' })
    @ZComponentGenerateId()
    class ZComponentGenerateIdTest extends HTMLDivElement {}

    const createTestTarget = (id?: string) => {
      const $html = html`<div is="${tag}" id="${id || ''}"></div>`;
      const template = document.createElement('template');
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentGenerateIdTest>(`div[is="${tag}"]`);
    };

    it('should generate an id on the target', () => {
      shouldGenerateAnIdOnTheTarget(createTestTarget);
    });

    it('should keep the id if it already exists', () => {
      shouldKeepIdIfItAlreadyExists(createTestTarget);
    });
  });
});
