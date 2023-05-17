import {
  cssStringToObject,
  isFunction,
  isInteger,
  resolvePath,
  setIn,
  toKey,
  toPath,
  updateNameAndIdWithIndex,
} from './utils';

describe('cssStringToObject()', () => {
  test('should convert to object', () => {
    const result = cssStringToObject(
      'color:blue;' +
        'text-align:center;' +
        'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);' +
        'background-color: var(--color-white);' +
        'background-image: url("test.svg");',
    );
    expect(result).toStrictEqual({
      color: 'blue',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'var(--color-white)',
      backgroundImage: 'url("test.svg")',
    });
  });

  test('should convert to object with empty string', () => {
    const result = cssStringToObject('');
    expect(result).toStrictEqual({});
  });
});

describe('isFunction', () => {
  it('correctly validate function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isFunction(() => {})).toBe(true);
  });

  it('correctly validate not function', () => {
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction('')).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction({})).toBe(false);
  });
});

describe('isInteger', () => {
  it('correctly validate integer', () => {
    expect(isInteger('1')).toBe(true);
    expect(isInteger(1)).toBe(true);
  });

  it('correctly validate not integer', () => {
    expect(isInteger(undefined)).toBe(false);
    expect(isInteger('1.1')).toBe(false);
    expect(isInteger('')).toBe(false);
    expect(isInteger([])).toBe(false);
    expect(isInteger({})).toBe(false);
  });
});

describe('toPath', () => {
  it('flat key', () => {
    expect(toPath('foo')).toStrictEqual(['foo']);
  });
  it('composite key', () => {
    expect(toPath('foo][bar')).toStrictEqual(['foo', 'bar']);
  });
  it('array key', () => {
    expect(toPath('foo][0')).toStrictEqual(['foo', '0']);
  });
});

describe('toKey', () => {
  it('flat key', () => {
    expect(toKey(['foo'])).toStrictEqual('foo');
  });
  it('composite key', () => {
    expect(toKey(['foo', 'bar'])).toStrictEqual('foo][bar');
  });
  it('array key', () => {
    expect(toKey(['foo', 'items', '0', '_item_'])).toStrictEqual('foo][0');
  });
  it('composite array key', () => {
    expect(toKey(['foo', 'items', '0', '_item_', 'bar'])).toStrictEqual(
      'foo][0][bar',
    );
  });
});

describe('setIn', () => {
  it('flat key', () => {
    expect(setIn({}, 'foo', 'bar')).toStrictEqual({ foo: 'bar' });
  });
  it('composite key', () => {
    expect(setIn({}, 'foo][bar', 'baz')).toStrictEqual({ foo: { bar: 'baz' } });
  });
  it('array key', () => {
    expect(setIn({}, 'foo][0', 'bar')).toStrictEqual({ foo: ['bar'] });
  });
  it('array key > 0', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(setIn({}, 'foo][1', 'bar')).toStrictEqual({ foo: [, 'bar'] });
  });
  it('flat key with existing value', () => {
    expect(setIn({ baz: 'qux' }, 'foo', 'bar')).toStrictEqual({
      foo: 'bar',
      baz: 'qux',
    });
  });
  it('composite key with existing value', () => {
    expect(setIn({ baz: 'qux' }, 'foo][bar', 'baz')).toStrictEqual({
      foo: { bar: 'baz' },
      baz: 'qux',
    });
  });
  it('composite key with existing value in children', () => {
    expect(setIn({ foo: { baz: 'qux' } }, 'foo][bar', 'baz')).toStrictEqual({
      foo: { bar: 'baz', baz: 'qux' },
    });
  });
  it('array key with existing value', () => {
    expect(setIn({ foo: ['bar'] }, 'foo][1', 'baz')).toStrictEqual({
      foo: ['bar', 'baz'],
    });
  });
});

describe('updateNameAndIdWithIndex', () => {
  const element1 = {
    child1: { '#id': 'id_without_index', '#name': 'name_without_index' },
  };
  const element2 = {
    child1: { '#id': 'child1_id[1]', '#name': 'child1_name[1]' },
    child2: { '#id': 'child2_id[1]', '#name': 'child2_name[1]' },
  };
  const element3 = {
    child1: {
      '#id': 'child1_id[2]',
      '#name': 'child1_name[2]',
      child3: {
        '#id': 'child3_id[2]',
        '#name': 'child3_name[2]',
        child4: { '#id': 'child4_id[2]', '#name': 'child4_name[2]' },
      },
    },
    child2: { '#id': 'child2_id[2]', '#name': 'child2_name[2]' },
  };
  it('Element with children with no index', () => {
    updateNameAndIdWithIndex(0, element1);
    expect(element1['child1']['#id']).toStrictEqual('id_without_index[0]');
    expect(element1['child1']['#name']).toStrictEqual('name_without_index[0]');
  });
  it('Element with children', () => {
    updateNameAndIdWithIndex(2, element2);
    expect(element2['child1']['#id']).toStrictEqual('child1_id[2]');
    expect(element2['child1']['#name']).toStrictEqual('child1_name[2]');
    expect(element2['child2']['#id']).toStrictEqual('child2_id[2]');
    expect(element2['child2']['#name']).toStrictEqual('child2_name[2]');
  });
  it('Element with three levels of children', () => {
    updateNameAndIdWithIndex(3, element3);
    expect(element3['child1']['#id']).toStrictEqual('child1_id[3]');
    expect(element3['child1']['#name']).toStrictEqual('child1_name[3]');
    expect(element3['child2']['#id']).toStrictEqual('child2_id[3]');
    expect(element3['child2']['#name']).toStrictEqual('child2_name[3]');
    expect(element3['child1']['child3']['#id']).toStrictEqual('child3_id[3]');
    expect(element3['child1']['child3']['#name']).toStrictEqual(
      'child3_name[3]',
    );
    expect(element3['child1']['child3']['child4']['#id']).toStrictEqual(
      'child4_id[3]',
    );
    expect(element3['child1']['child3']['child4']['#name']).toStrictEqual(
      'child4_name[3]',
    );
  });
});

describe('resolvePath', () => {
  it('returns value', () => {
    const obj = { items: { _item_: { child: 'foo' } } };
    expect(resolvePath('items._item_.child', obj)).toEqual('foo');
  });
  it('returns object', () => {
    const obj = {
      items: { _item_: { child: { 0: { boo: { loo: 'hi' } } } } },
    };
    expect(resolvePath('items._item_.child.0.boo', obj)).toEqual({ loo: 'hi' });
  });
  it('path that does not exist', () => {
    const obj = { items: { _item_: { child: 'foo' } } };
    expect(resolvePath('i.dont.exist', obj)).toEqual(null);
  });
  it('single string path', () => {
    const obj = { items: { _item_: { child: 'foo' } } };
    expect(resolvePath('items', obj)).toEqual({ _item_: { child: 'foo' } });
  });
  it('undefined path', () => {
    const obj = { items: { _item_: { child: 'foo' } } };
    expect(() => {
      resolvePath(undefined, obj);
    }).toThrowError(TypeError);
  });
});
