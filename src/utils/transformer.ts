import type {
  RegItem,
  RegStructualItem,
  RegVariant,
  RegEntity,
} from '../types/reg';

type Dirs = {
  diff: string;
  actual: string;
  expected: string;
};

export const toEntities = (
  variant: RegVariant,
  dirs: Dirs,
  items: RegItem[],
): RegEntity[] => {
  const join = (key: keyof Dirs, to: string) =>
    dirs[key].replace(/\/$/, '') + '/' + to.replace(/^\//, '');

  return items.map((item) => {
    const id = `${variant}-${item.encoded}`.replace(/[=?]/g, '-');

    return {
      id,
      variant,
      name: item.raw,
      diff: join('diff', item.encoded).replace(/\.[^.]+$/, '.png'),
      before: join('expected', item.encoded),
      after: join('actual', item.encoded),
    };
  });
};

export const toStructualItems = (entities: RegEntity[]): RegStructualItem[] => {
  const results: RegStructualItem[] = [];

  entities.forEach((entity) => {
    const id = entity.id;
    const path = entity.name;
    const segments = path.split('/');
    let obj = results;

    segments.forEach((segment) => {
      const v = obj.find((r) => r.name === segment);

      if (v != null) {
        obj = v.children;
      } else {
        const o = {
          id,
          path,
          name: segment,
          children: [],
        };

        obj.push(o);
        obj = o.children;
      }
    });
  });

  return results;
};
