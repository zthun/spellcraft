/**
 * Mutates an attribute by setting it for a non null value, or removing it for a null value.
 *
 * @param e -
 *        The element to update the attribute for.
 * @param name -
 *        The name of the attribute.
 * @param val -
 *        The value to set.  If this is null or undefined, then the attribute is
 *        removed, otherwise, it is set.
 */
export function mutateAttribute<T extends string = string>(e: Element, name: string, val: T | null | undefined): void {
  val == null ? e.removeAttribute(name) : e.setAttribute(name, val);
}
