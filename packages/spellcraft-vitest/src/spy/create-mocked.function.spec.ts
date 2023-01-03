import { Mocked } from 'vitest';
import { describe, it, expect } from 'vitest';
import { createMocked } from './create-mocked.function';

describe('createMocked', () => {
  it('should create a mock object.', () => {
    // Arrange
    const target: Mocked<string> = createMocked<string>(['trim']);
    // Act
    const trim = target.trim;
    // Assert
    expect(trim).toBeTruthy();
  });

  it('should create an empty mock object.', () => {
    // Arrange
    // Act
    const target = createMocked<string>();
    // Assert
    expect(target).toBeTruthy();
  });
});
