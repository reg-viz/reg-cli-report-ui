import path from 'path';
import { RegItem, RegStructualItem, RegVariant, RegEntity } from '../types/reg';

type Dirs = {
  diff: string;
  actual: string;
  expected: string;
};

export const toEntities = (variant: RegVariant, dirs: Dirs, items: RegItem[]): RegEntity[] =>
  items.map((item) => {
    const id = `${variant}-${item.encoded}`;

    return {
      id,
      variant,
      name: item.raw,
      diff: path.join(dirs.diff, item.raw),
      before: path.join(dirs.expected, item.raw),
      after: path.join(dirs.actual, item.raw),
    };
  });

export const toStructualItems = (entities: RegEntity[]): RegStructualItem[] =>
  entities.map((entity) => {
    const id = entity.id;
    const path = entity.name;
    const segments = path.split('/').reverse();
    const edge = {
      id: entity.id,
      path,
      name: segments.shift() as string,
    };

    return segments.reduce(
      (acc, cur) => ({
        id,
        path,
        name: cur,
        child: acc,
      }),
      edge,
    );
  });
