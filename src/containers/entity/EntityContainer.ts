import { createContainer } from 'unstated-next';
import { useMemo } from 'react';
import { toEntities } from '../../utils/transformer';
import { RegData, RegEntity } from '../../types/reg';

export type EntityValue = {
  newItems: RegEntity[];
  passedItems: RegEntity[];
  failedItems: RegEntity[];
  deletedItems: RegEntity[];
  allItems: RegEntity[];
};

export const EntityContainer = createContainer<EntityValue, RegData>((initialState) => {
  if (initialState == null) {
    return {
      newItems: [],
      passedItems: [],
      failedItems: [],
      deletedItems: [],
      allItems: [],
    };
  }

  const dirs = {
    diff: initialState.diffDir,
    expected: initialState.expectedDir,
    actual: initialState.actualDir,
  };

  const newItems = useMemo(() => toEntities('new', dirs, initialState.newItems), [dirs, initialState.newItems]);
  const passedItems = useMemo(() => toEntities('passed', dirs, initialState.passedItems), [
    dirs,
    initialState.passedItems,
  ]);
  const failedItems = useMemo(() => toEntities('changed', dirs, initialState.failedItems), [
    dirs,
    initialState.failedItems,
  ]);
  const deletedItems = useMemo(() => toEntities('deleted', dirs, initialState.deletedItems), [
    dirs,
    initialState.deletedItems,
  ]);

  const allItems = useMemo(() => [...failedItems, ...newItems, ...deletedItems, ...passedItems], [
    newItems,
    passedItems,
    failedItems,
    deletedItems,
  ]);

  return {
    newItems,
    passedItems,
    failedItems,
    deletedItems,
    allItems,
  };
});
