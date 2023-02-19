import { vitest, Mocked } from 'vitest';

/**
 * Creates a mocked object with a given set of methods.
 *
 * @param methods -
 *        The methods of type T to mock.
 *
 * @returns
 *        The object mock.
 */
export function createMocked<T>(methods?: Array<keyof T>): Mocked<T> {
  const mockup = {} as Mocked<T>;

  methods = methods || [];
  methods.forEach((method) => {
    mockup[method] = vitest.fn() as unknown as Mocked<T>[keyof T];
  });

  return mockup;
}
