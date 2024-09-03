import { firstDefined } from "@zthun/helpful-fn";

/**
 * A set of organized helpers for working with dom attributes.
 */
export abstract class ZAttributes {
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
  public static mutate<T extends string = string>(
    e: Element,
    name: string,
    val: T | null | undefined,
  ): void {
    if (val == null) {
      e.removeAttribute(name);
    } else {
      e.setAttribute(name, val);
    }
  }

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
  public static query<T extends string = string>(
    e: Element,
    name: string,
    fallback: T,
  ): T {
    return firstDefined(fallback, e.getAttribute(name) as T);
  }

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
  public static stringify(
    name: string,
    value: boolean | string | number | object | null | undefined,
  ): string {
    if (value == null) {
      return "";
    }

    const t = typeof value;

    if (t === "boolean") {
      return value ? name : "";
    }

    if (t === "number") {
      return `${name}="${value}"`;
    }

    if (t === "object") {
      return `${name}="${JSON.stringify(value)}"`;
    }

    const str = String(value);
    return str === "" ? "" : `${name}="${str}"`;
  }
}
