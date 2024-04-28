import { atom, useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { WorkerEventType } from '../types/event';
import type { RegData, RegEntity } from '../types/reg';
import type { Store } from '../types/store';
import { toEntities } from '../utils/transformer';
import type { WorkerClient } from '../worker-client';
import { useWorkerClient } from './worker';

type EntityState = {
  new: RegEntity[];
  passed: RegEntity[];
  failed: RegEntity[];
  deleted: RegEntity[];
};

const defaultEntityAtom = atom<EntityState>({
  new: [],
  passed: [],
  failed: [],
  deleted: [],
});

const entityAtom = atom<EntityState>({
  new: [],
  passed: [],
  failed: [],
  deleted: [],
});

const allEntitiesAtom = atom((get) => {
  const entity = get(entityAtom);
  return entity.failed.concat(entity.new, entity.deleted, entity.passed);
});

const filteredAtom = atom(false);

export const initializeEntityState = (
  store: Store,
  data: RegData,
  worker: WorkerClient,
) => {
  const dirs = {
    diff: data.diffDir,
    expected: data.expectedDir,
    actual: data.actualDir,
  };

  store.set(defaultEntityAtom, {
    new: toEntities('new', dirs, data.newItems),
    passed: toEntities('passed', dirs, data.passedItems),
    failed: toEntities('changed', dirs, data.failedItems),
    deleted: toEntities('deleted', dirs, data.deletedItems),
  });

  store.set(entityAtom, {
    ...store.get(defaultEntityAtom),
  });

  worker.subscribe(WorkerEventType.RESULT_FILTER, (payload) => {
    store.set(entityAtom, {
      new: payload.newItems,
      passed: payload.passedItems,
      failed: payload.failedItems,
      deleted: payload.deletedItems,
    });
  });
};

export const useEntities = () => {
  const entity = useAtomValue(entityAtom);
  const allItems = useAtomValue(allEntitiesAtom);

  return {
    newItems: entity.new,
    passedItems: entity.passed,
    failedItems: entity.failed,
    deletedItems: entity.deleted,
    allItems,
  };
};

export const useEntityFilter = () => {
  const worker = useWorkerClient();
  const [isFiltered, setIsFiltered] = useAtom(filteredAtom);
  const defaults = useAtomValue(defaultEntityAtom);

  const filter = useCallback(
    (input: string) => {
      if (worker == null) {
        return;
      }

      const value = input.trim();

      setIsFiltered(value !== '');

      worker.requestFilter({
        input: value,
        newItems: defaults.new,
        passedItems: defaults.passed,
        failedItems: defaults.failed,
        deletedItems: defaults.deleted,
      });
    },
    [worker, setIsFiltered, defaults],
  );

  return [isFiltered, filter] as const;
};
