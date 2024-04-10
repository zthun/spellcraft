import { ZComponentConstructor } from '../component/component-constructor.mjs';
import { IZLifecycleDisconnectedMaybe } from '../lifecycle/lifecycle-disconnected.mjs';
import { IZComponentWithStyleElement } from './component-styles.mjs';

/**
 * Requirements for ZComponentStylesRemoveOnDisconnect targets.
 */
export type ZComponentStylesRemoveOnDisconnectRequirements = HTMLElement &
  IZComponentWithStyleElement &
  IZLifecycleDisconnectedMaybe;

/**
 * A aspect will remove stylesElement when the parent component is disconnected from the DOM.
 *
 * You will mostly likely need this if you are using {@link ZComponentStyles} and you are not
 * setting a static id.
 *
 * @param TElement -
 *        The element with requirements for adding this decorator.
 *
 * @returns
 *        A new class that extends from the target class that adds a new property,
 *        styleElement
 */
export function ZComponentStylesRemoveOnDisconnect<TElement extends ZComponentStylesRemoveOnDisconnectRequirements>() {
  return function (target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    class _ZComponentStylesRemoveOnDisconnect extends target implements IZLifecycleDisconnected {
      public disconnectedCallback(): void {
        super.disconnectedCallback?.call(this);
        this.styleElement?.remove();
      }
    }

    return _ZComponentStylesRemoveOnDisconnect;
  };
}
