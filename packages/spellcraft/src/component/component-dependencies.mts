/* eslint-disable @typescript-eslint/no-unused-vars */

import { ZComponentConstructor } from './component-constructor.mjs';

/**
 * A mixin decorator that signals that the component has other component dependencies.
 *
 * This does nothing.
 *
 * The main point of this is if you want to keep all
 * of your custom web components tree shakable, but
 * the component you're writing depends on other components
 * that have to be registered with the custom elements
 * registry.
 *
 * This essentially makes sure that your dependency graph
 * auto registers those components by forcing an import
 * where you may not actually need the web component
 * instance and instead just need to make sure the actual
 * web component class constructor function is included
 * with your bundle.
 *
 * @param dependencies -
 *        The dependencies that this component requires.
 *
 * @returns
 *        The target component class.
 *
 * @example
 * ```ts
 * import { html } from '@zthun/helpful-fn';
 * import { ZOtherComponent } from './other-component';
 *
 * @ZComponentRegister('z-fancy-component')
 * @ZComponentRenderTemplate()
 * @ZComponentRender()
 * // Does not actually do anything, but makes it so that importing this
 * // component does not tree shake out ZOtherComponent if all we are referencing
 * // is the tag name of the component.
 * @ZComponentDependencies([ZOtherComponent])
 * export class ZFancyComponentElement extends HTMLElement {
 *     public template() {
 *         return html`
 *            <z-other-component>
 *              Notice that nowhere in this component references the ZOtherComponent class
 *              but we use the tag name and expect it to be registered with the
 *              custom elements registry.  We won't get this behavior working if
 *              ZOtherComponent is tree shaken from our bundle.
 *            </z-other-component>
 *         `;
 *     }
 * }
 * ```
 */
export function ZComponentDependencies<TElement extends HTMLElement>(dependencies: CustomElementConstructor[]) {
  return function (Target: ZComponentConstructor<TElement>): any {
    return Target;
  };
}
