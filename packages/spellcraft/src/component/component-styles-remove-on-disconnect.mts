import { IZLifecycleDisconnectedMaybe } from '../lifecycle/lifecycle-disconnected.mjs';
import { ZComponentConstructor } from './component-constructor.mjs';
import { IZComponentWithStyleElement } from './component-styles.mjs';

type DecoratorRequirements = HTMLElement & IZComponentWithStyleElement & IZLifecycleDisconnectedMaybe;

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
export function ZComponentStylesRemoveOnDisconnect<TElement extends DecoratorRequirements>() {
  return function (target: ZComponentConstructor<TElement>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    class _ZComponentStylesAddOnConnect extends target implements IZLifecycleDisconnected {
      public disconnectedCallback(): void {
        super.disconnectedCallback?.call(this);
        this.styleElement?.remove();
      }
    }

    return _ZComponentStylesAddOnConnect;
  };
}
