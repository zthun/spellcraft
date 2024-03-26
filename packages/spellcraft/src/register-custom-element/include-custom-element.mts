import { identity } from 'lodash-es';

/**
 * Does nothing.
 *
 * Mostly to make sure that custom elements are registered
 * and not removed by tree shaking.
 *
 * @param ctor -
 *        The custom element constructor.
 */
export const includeCustomElement: (ctor: CustomElementConstructor) => void = identity;
