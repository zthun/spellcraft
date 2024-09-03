import { createGuid, firstTruthy } from "@zthun/helpful-fn";
import { ZComponentConstructor } from "./component-constructor.mjs";

/**
 * Options for a styles component.
 */
export interface IZComponentCssOptions {
  /**
   * The id of the styles element.
   *
   * If this is not set, then one will be generated for you.
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
 * An aspect that can add a style element to the document head one time.
 *
 * The css is immediately added as soon as the element is constructed.
 *
 * This is different that {@link ZComponentStyles} as this one is for non-dynamic
 * styles that are not expected to change.  You can completely go without this and
 * encapsulate everything in {@link ZComponentStyles}; however, using this in conjunction
 * with {@link ZComponentStyles} will give you both, static and dynamic styles and will
 * set the boundary between both of them.
 *
 * @param css -
 *        The static css to add to the document head.
 * @param options -
 *        The options for the style component.
 *
 * @returns
 *        A new class that extends from the target class that adds a style
 *        element to the document head if it does not already exist.
 */
export function ZComponentCss<TElement extends HTMLElement>(
  css: string,
  options?: IZComponentCssOptions,
) {
  const prefix = firstTruthy("css", options?.prefix);
  const id = firstTruthy(`${prefix}-${createGuid()}`, options?.id);
  const selector = `#${id}`;

  return function (target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentCss extends target {
      public constructor() {
        super();

        let styleElement = document.head.querySelector(selector);

        if (styleElement == null) {
          styleElement = document.createElement("style");
          styleElement.id = id;
          styleElement.textContent = css;
          document.head.appendChild(styleElement);
        }
      }
    };
  };
}
