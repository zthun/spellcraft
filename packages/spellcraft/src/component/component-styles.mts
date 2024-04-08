import { createGuid, firstDefined, firstTruthy } from '@zthun/helpful-fn';
import { ZComponentConstructor } from './component-constructor.mjs';

/**
 * A web component that has a styles factory.
 */
export interface IZComponentStyles {
  /**
   * Returns the current component css styles.
   *
   * @returns
   *        The css of this component.  Should return
   *        undefined if there are no styles.
   */
  styles(): string | undefined;
}

/**
 * Options for a styles component.
 */
export interface IZComponentStylesOptions {
  /**
   * The id of the styles to search for.
   *
   * You don't have to set this but it is recommended
   * to make it easy to debug and search for in the document
   * head. If this is falsy, then an id will be generated for you
   * for the given component.
   */
  id?: string;
}

/**
 * Represents an element that contains a style element.
 */
export interface IZComponentWithStyleElement {
  /**
   * Gets the current state of the style element.
   *
   * This can be null if the style element has not
   * yet been created.
   */
  readonly styleElement: HTMLStyleElement | null;

  /**
   * Sets the styles for the given component in the document head
   * fragment.
   *
   * This method will create the style element if it does not already
   * exist.
   *
   * @param css -
   *        The css for the component.
   *
   * @returns
   *        The current style element attached for the component.
   */
  refreshStyles(css?: string): HTMLStyleElement;
}

/**
 * A component that can add a style element to the document head.
 *
 * @param options -
 *        The options for the style component.
 *
 * @returns
 *        A new class that extends from the target class that adds a new property,
 *        styleElement
 */
export function ZComponentStyles<TElement extends HTMLElement>(options?: IZComponentStylesOptions) {
  const id = firstTruthy(`css-${createGuid()}`, options?.id);
  const selector = `#${id}`;

  return function (target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentStyles extends target implements IZComponentWithStyleElement {
      public styleElement: HTMLStyleElement | null = null;

      public refreshStyles(css?: string): HTMLStyleElement {
        this.styleElement = document.head.querySelector(selector);

        if (this.styleElement == null) {
          this.styleElement = document.createElement('style');
          this.styleElement.id = id;
          document.head.appendChild(this.styleElement);
        }

        this.styleElement.textContent = firstDefined('', css);
        return this.styleElement;
      }
    };
  };
}
