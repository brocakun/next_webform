import { normalizeElements } from './utils';

describe('normalizeElements()', () => {
  it('should clean up recursively', () => {
    const result = normalizeElements({
      '#keep': '🐈',
      '#pre_render': '🐛',
      children: {
        '#keep': '🐈',
        '#prefix': '🐍',
        children_children: {
          '#keep': '🐈',
          '#suffix': '🐝',
        },
      },
    });
    expect(result).toStrictEqual({
      '#keep': '🐈',
      children: {
        '#keep': '🐈',
        children_children: {
          '#keep': '🐈',
        },
      },
    });
  });

  it('should not error with empty object', () => {
    const result = normalizeElements({});
    expect(result).toStrictEqual({});
  });
});
