import { trimStart } from 'lodash-es';

/**
 * Constructs a cssVariable reference for the property value.
 *
 * This method auto corrects the property value.  So if you pass
 * something that does not start with --, it will correct it and
 * put the -- at the start.
 *
 * @param property -
 *        The property to reference.
 *
 * @returns
 *        A css variable string reference with the property wrapped
 *        in a var.
 *
 * @example
 * ```ts
 *  const output = cssVariable('my-variable');
 *  // outputs "var(--my-variable)""
 *  console.log(output);
 * ```
 */
export function cssVariable(property: string): string {
  property = trimStart(property, '-');
  return `var(--${property})`;
}
