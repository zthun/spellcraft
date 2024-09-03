import { firstDefined } from "@zthun/helpful-fn";
import { ZIntrinsic, ZTrilean, trilean } from "@zthun/trilean";
import { kebabCase } from "lodash-es";
import { ZAttributes } from "./attributes.mjs";

/**
 * Options for an attribute property.
 */
export type IZAttributeOptions = {
  /**
   * The name of the attribute.  If this is undefined,
   * then the defined property name is used.
   */
  name?: string;

  /**
   * An optional fallback value in the case the an attribute value
   * is non existent.
   *
   * The default fallback depends on the actual type.
   *
   * Boolean's here are a special case in that if a fallback is not specified, then
   * they will be true if they exist but false if their value is not explicitly false.
   *
   * Trilean values are also special in that the fallback of null will take a higher
   * precedent over the false default of an intrinsic false value.
   */
  fallback?: bigint | number | string | boolean | trilean;

  /**
   * Let null be a valid value, which will override the intrinsic default type.
   *
   * Note that bigint, function, object, trilean and symbol are nullable by default
   * and their default value is automatically null.
   */
  nullable?: boolean;

  /**
   * The property expected type.  If this is falsy, then a string is assumed.
   */
  type?: ZIntrinsic;
};

/**
 * A decorator that marks an HTMLElement property that is backed by an
 * attribute that represents an intrinsic value.
 *
 * All intrinsic values have a default value.
 *
 * |Type     |Default      |
 * |---------|-------------|
 * |bigint   |null         |
 * |boolean  |false        |
 * |function |null         |
 * |number   |NaN          |
 * |object   |null         |
 * |string   |''           |
 * |symbol   |null         |
 * |trilean  |false        |
 *
 * If you do not want the default value for an attribute, then you have to set
 * the {@link IZAttributeOptions.nullable} to true and the default value will
 * return null if it is not set.
 *
 * Note that an attribute will support a trilean value that is not a fully native
 * intrinsic value.  If you need support for trilean values in your components, then
 * you will also want a dependency on the [\@zthun/trilean](https://www.npmjs.com/)
 * package which implements helpers and type definitions.
 *
 * @param options -
 *        The options for the attribute.
 *
 * @returns
 *        A property decorator that turns a single property to be backed by
 *        an HTMLElement attribute.
 *
 * @example Declare a string attribute.
 *
 * ```ts
 * export class FancyComponent {
 *    @ZAttribute()
 *    public value: string;
 * }
 * ```
 *
 * @example Declare a boolean attribute.
 *
 * ```ts
 * export class FancyComponent {
 *    // Will attempt to parse the attribute value as a boolean.
 *    // Boolean values will return false by default as the default
 *    // intrinsic value is false for a boolean.
 *    @ZAttribute({ type: 'boolean' })
 *    public value: boolean;
 * }
 * ```
 *
 * @example Declare a numeric value with a fallback.
 *
 * ```ts
 * export class FancyComponent {
 *    // Will return 42 if there is no attribute set
 *    @ZAttribute({ type: 'number', fallback: 42 })
 *    public value: number;
 * }
 * ```
 *
 * @example Declare a trilean value with a fallback of indeterminate.
 *
 * ```ts
 * import { trilean, ZTrilean } from '@zthun/trilean';
 *
 * export class FancyComponent {
 *    // Will return the indeterminate value as the fallback.
 *    @ZAttribute({ type: 'trilean', fallback: ZTrilean.Indeterminate })
 *    public value: trilean;
 * }
 * ```
 */
export function ZAttribute(options?: IZAttributeOptions): PropertyDecorator {
  return <C extends HTMLElement>(
    target: C,
    propertyKey: string | symbol,
  ): void => {
    const $default = kebabCase(String(propertyKey));
    const attr = String(firstDefined($default, options?.name));
    const nullable = options?.nullable;
    const type = options?.type;
    const fallback = options?.fallback;
    const _type = type || "string";

    const $defaults: Record<ZIntrinsic, any> = {
      bigint: null,
      boolean: nullable ? null : false,
      function: null,
      number: nullable ? null : NaN,
      object: null,
      string: nullable ? null : "",
      symbol: null,
      trilean: false,
    };

    const attrToIntr: Record<
      ZIntrinsic,
      (v: string | null) => bigint | number | string | boolean | symbol
    > = {
      bigint: (v) =>
        v == null ? firstDefined($defaults.bigint, fallback) : BigInt(v),
      boolean: (v) =>
        v == null ? firstDefined($defaults.boolean, fallback) : v !== "false",
      function: () => $defaults.function,
      number: (v) =>
        v == null ? firstDefined($defaults.number, fallback) : +v,
      object: () => $defaults.object,
      string: (v) => (v == null ? firstDefined($defaults.string, fallback) : v),
      symbol: () => $defaults.symbol,
      trilean: (v) => ZTrilean.parse(v, ZTrilean.convert(fallback)),
    };

    const toString = (v: any): string | null => {
      return v == null ? null : String(v);
    };

    const toError = () => {
      throw new Error(
        `Type, ${type}, is not a supported value of an attribute.  Use a property instead.`,
      );
    };

    const toTrilean = (v: any): string => {
      return ZTrilean.stringify(ZTrilean.convert(v));
    };

    const intrToAttr: Record<ZIntrinsic, (v: any) => string | null> = {
      bigint: toString,
      boolean: toString,
      function: toError,
      number: toString,
      object: toError,
      string: toString,
      symbol: toError,
      trilean: toTrilean,
    };

    function get(this: C) {
      const value = this.getAttribute(attr);
      return attrToIntr[_type](value);
    }

    function set(this: C, newValue: any) {
      const asText = intrToAttr[_type](newValue);
      ZAttributes.mutate(this, attr, asText);
    }

    Object.defineProperty(target, propertyKey, {
      get,
      set,
    });
  };
}
