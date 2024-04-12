import { ZComponentConstructor } from './component-constructor.mjs';

/**
 * Values that can be placed in a link's rel attribute.
 */
export type ZLinkRelationship =
  | 'alternate'
  | 'author'
  | 'dns-prefetch'
  | 'help'
  | 'icon'
  | 'license'
  | 'next'
  | 'pingback'
  | 'preconnect'
  | 'prefetch'
  | 'preload'
  | 'prerender'
  | 'prev'
  | 'search'
  | 'stylesheet';

/**
 * An aspect that can add a link element to the document head one time.
 *
 * The link is immediately added as soon as the element is constructed.
 * A unique link is defined by both the relationship and the href.
 *
 * @param rel -
 *        The relationship between the current document and linked document.
 * @param href -
 *        The location of the linked document.
 *
 * @returns
 *        A new class that extends the target class which automatically adds a
 *        link element to the document head when constructed if it does not
 *        already exist.
 */
export function ZComponentLink<TElement extends HTMLElement>(rel: ZLinkRelationship, href: string) {
  return function (target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    return class _ZComponentLink extends target {
      public constructor() {
        super();

        const selector = `link[rel="${rel}"][href="${href}"]`;
        let linkElement = document.head.querySelector<HTMLLinkElement>(selector);

        if (linkElement == null) {
          linkElement = document.createElement('link');
          linkElement.rel = rel;
          linkElement.href = href;
          document.head.appendChild(linkElement);
        }
      }
    };
  };
}
