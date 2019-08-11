import { toStructualItems, toEntities } from '../transformer';
import { createRegEntity } from '../../mocks';

describe('transformer', () => {
  test('toStructualItems', () => {
    const variant = 'new';
    const raw = 'raw';
    const encoded = 'encoded';
    const dirs = {
      diff: 'diff/',
      expected: 'expected/',
      actual: 'actual/',
    };

    expect(toEntities(variant, dirs, [{ raw, encoded }])).toEqual([
      {
        id: `${variant}-${encoded}`,
        variant,
        name: raw,
        diff: `${dirs.diff}${raw}`,
        before: `${dirs.expected}${raw}`,
        after: `${dirs.actual}${raw}`,
      },
    ]);
  });

  test('toStructualItems', () => {
    const entity = createRegEntity({
      id: 'id',
      name: 'foo/bar/baz.jpg',
    });

    expect(toStructualItems([entity])).toEqual([
      {
        id: entity.id,
        path: entity.name,
        name: 'foo',
        child: {
          id: entity.id,
          path: entity.name,
          name: 'bar',
          child: {
            id: entity.id,
            path: entity.name,
            name: 'baz.jpg',
          },
        },
      },
    ]);
  });
});
