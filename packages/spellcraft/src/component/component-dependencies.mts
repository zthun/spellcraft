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
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ZComponentDependencies(dependencies: CustomElementConstructor[]) {
  return function <C extends typeof HTMLElement>(Target: C) {
    return Target;
  };
}
