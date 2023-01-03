/**
 * Creates a mocked object with a given set of methods.
 *
 * @param methods
 *        The methods of type T to mock.
 *
 * @returns
 *        The object mock.
 */
export function createMocked<T>(methods?: Array<keyof T>): jest.Mocked<T> {
  const mockup: jest.Mocked<T> = {} as jest.Mocked<T>;

  methods = methods || [];
  methods.forEach((method) => {
    mockup[method] = jest.fn() as unknown as jest.Mocked<T>[keyof T];
  });

  return mockup;
}
