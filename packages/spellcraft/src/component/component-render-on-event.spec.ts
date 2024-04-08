import { html } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZNode } from '../node/node.mjs';
import { ZComponentRegister } from './component-register.mjs';
import { ZComponentRenderOnEvent } from './component-render-on-event.mjs';
import { IZComponentRender } from './component-render.mjs';

describe('ZComponentRenderOnEvent', () => {
  afterEach(() => {
    new ZNode(document.body).clear();
  });

  describe('All events from all children', () => {
    const tag = 'z-component-render-on-event-self-and-children-test';

    @ZComponentRegister(tag)
    @ZComponentRenderOnEvent('click')
    class ZComponentRenderOnEventSelfAndChildrenTest extends HTMLElement implements IZComponentRender {
      public render = vi.fn();
    }

    const createTestTarget = () => {
      const $html = html`
      <div>
        <${tag}>
          <button class='should-raise-click'></button>
        </${tag}>
      </div>
    `;

      const template = document.createElement('template');
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentRenderOnEventSelfAndChildrenTest>(tag)!;
    };

    it('should render when an event is raised from the child', () => {
      // Arrange.
      const target = createTestTarget();
      const btn = target.querySelector<HTMLButtonElement>('.should-raise-click');
      target.render.mockClear();
      // Act.
      btn?.click();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });

    it('should render when an event is raised from the component itself', () => {
      // Arrange.
      const target = createTestTarget();
      target.render.mockClear();
      // Act.
      target.click();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });
  });

  describe('Targeted event', () => {
    const tag = 'z-component-render-on-event-children-only-test';

    @ZComponentRegister(tag)
    @ZComponentRenderOnEvent('click', {
      preventDefault: true,
      stopImmediatePropagation: true,
      stopPropagation: true,
      selector: '.should-raise-click'
    })
    class ZComponentRenderOnChildrenOnlyEventTest extends HTMLElement implements IZComponentRender {
      public render = vi.fn();
    }

    const createTestTarget = () => {
      const $html = html`
      <div>
        <${tag}>
          <button class='should-raise-click'></button>
        </${tag}>
      </div>
    `;

      const template = document.createElement('template');
      template.innerHTML = $html;
      document.body.appendChild(template.content.cloneNode(true));
      return document.body.querySelector<ZComponentRenderOnChildrenOnlyEventTest>(tag)!;
    };

    it('should render when an event is raised from the child', () => {
      // Arrange.
      const target = createTestTarget();
      const btn = target.querySelector<HTMLButtonElement>('.should-raise-click');
      target.render.mockClear();
      // Act.
      btn?.click();
      // Assert.
      expect(target.render).toHaveBeenCalledTimes(1);
    });

    it('should not render when an event is raised from the component itself', () => {
      // Arrange.
      const target = createTestTarget();
      target.render.mockClear();
      // Act.
      target.click();
      // Assert.
      expect(target.render).not.toHaveBeenCalled();
    });
  });
});
