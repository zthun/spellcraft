import { firstDefined } from '@zthun/helpful-fn';

/**
 * Queries an attribute from an element.
 *
 * @param e -
 *        The element to query from.
 * @param name -
 *        The name of the attribute to query.
 * @param fallback -
 *        The fallback in the case the attribute does not exist.
 *
 * @returns
 *        The value of the attribute, or fallback if there is no
 *        value for the given name.
 */
export function queryAttribute<T extends string = string>(e: Element, name: string, fallback: T): T {
  return firstDefined(fallback, e.getAttribute(name) as T);
}
