/**
 * A basic web component.
 */
export interface IZComponent {
  /**
   * The name of the component.
   *
   * This should be in PascalCase.  This allows the component
   * to automatically add classes and should determine
   * the actual tag name if not set.
   */
  name: string;

  /**
   * The tag to use for the element name or the is attribute value.
   *
   * If this is falsy, then the kebab case of the name should be used.
   */
  tag?: string;

  /**
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
   */
  dependencies?: CustomElementConstructor[];
}
