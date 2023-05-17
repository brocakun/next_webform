import { normalizeAttributes } from './withAttributes';

describe('normalizeAttributes()', () => {
  it('should clean properties', () => {
    const result = normalizeAttributes({
      id: '🐛',
      'data-drupal-selector': '🐍',
    });
    expect(result).toStrictEqual({});
  });

  it('should rename properties', () => {
    const result = normalizeAttributes({
      class: '🐈 🐕',
      readonly: true,
    });
    expect(result).toStrictEqual({
      className: '🐈 🐕',
      readOnly: true,
    });
  });

  it('should not error with empty attributes', () => {
    const result = normalizeAttributes({});
    expect(result).toStrictEqual({});
  });
});
