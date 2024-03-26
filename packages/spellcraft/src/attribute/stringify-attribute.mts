/**
 * A helpful method that allows you to stringify
 * an xml attribute given an intrinsic value and attribute name.
 *
 * @param name -
 *        The name of the attribute.
 * @param value -
 *        The value to stringify with the name.
 *
 * @returns
 *        Depending on the type of value, this method will
 *        return name="value" if the value of the given
 *        attribute name should be placed as an attribute
 *        of an xml tag.  If the value is null, undefined,
 *        false, or the empty string, then then empty string
 *        will be returned.  If an object is passed
 *        then that object is json stringified and put into
 *        the attribute.
 */
export function stringifyAttribute(name: string, value: boolean | string | number | object | null | undefined): string {
  if (value == null) {
    return '';
  }

  const t = typeof value;

  if (t === 'boolean') {
    return value ? name : '';
  }

  if (t === 'number') {
    return `${name}="${value}"`;
  }

  if (t === 'object') {
    return `${name}="${JSON.stringify(value)}"`;
  }

  const str = String(value);
  return str === '' ? '' : `${name}="${str}"`;
}

/**
 * Alias to {@link stringifyAttribute}
 *
 * This just saves you typing and makes
 * html interpolation a bit shorter to read.
 */
export const $attr = stringifyAttribute;
