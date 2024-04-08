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
   * If you don't set this, then a unique style element will
   * be added to the head for the component that has this aspect
   * and you should also add the
   * {@link ZComponentStylesRemoveOnDisconnect} to remove it when
   * the component is destroyed.
   *
   * If this is set, then multiple instances of the same component will
   * share these styles, so you need to make sure that you do not
   * have any dynamic styles and they are all static and only need
   * to be created once.
   */
  id?: string;

  /**
   * The prefix to append to an auto generated id.
   *
   * This will default to "css"
   */
  prefix?: string;
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
  const prefix = firstTruthy('css', options?.prefix);

  return function (target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentStyles extends target implements IZComponentWithStyleElement {
      private _styleElementId = firstTruthy(`${prefix}-${createGuid()}`, options?.id);

      public styleElement: HTMLStyleElement | null = null;

      public refreshStyles(css?: string): HTMLStyleElement {
        const selector = `#${this._styleElementId}`;
        this.styleElement = document.head.querySelector(selector);

        if (this.styleElement == null) {
          this.styleElement = document.createElement('style');
          this.styleElement.id = this._styleElementId;
          document.head.appendChild(this.styleElement);
        }

        this.styleElement.textContent = firstDefined('', css);
        return this.styleElement;
      }
    };
  };
}
