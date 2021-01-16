import { createContainer } from 'unstated-next';
import { useMemo, useContext, useState, useEffect } from 'react';
import { toEntities } from '../../utils/transformer';
import type { RegData, RegEntity } from '../../types/reg';
import { WorkerContext } from '../../context/WorkerContext';
import { WorkerEventType } from '../../types/event';

export type EntityValue = {
  filtering: boolean;
  newItems: RegEntity[];
  passedItems: RegEntity[];
  failedItems: RegEntity[];
  deletedItems: RegEntity[];
  allItems: RegEntity[];
  filter: (input: string) => void;
};

export const EntityContainer = createContainer<EntityValue, RegData>(
  (initialState) => {
    if (initialState == null) {
      throw new Error('Unexpected error occurred');
    }

    const worker = useContext(WorkerContext);
    const [filtering, setFiltering] = useState(false);

    const dirs = {
      diff: initialState.diffDir,
      expected: initialState.expectedDir,
      actual: initialState.actualDir,
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    const defaultNewItems = useMemo(
      () => toEntities('new', dirs, initialState.newItems),
      [initialState.newItems],
    );
    const defaultPassedItems = useMemo(
      () => toEntities('passed', dirs, initialState.passedItems),
      [initialState.passedItems],
    );
    const defaultFailedItems = useMemo(
      () => toEntities('changed', dirs, initialState.failedItems),
      [initialState.failedItems],
    );
    const defaultDeletedItems = useMemo(
      () => toEntities('deleted', dirs, initialState.deletedItems),
      [initialState.deletedItems],
    );
    /* eslint-enable */

    const [newItems, setNewItems] = useState(defaultNewItems);
    const [passedItems, setPassedItems] = useState(defaultPassedItems);
    const [failedItems, setFailedItems] = useState(defaultFailedItems);
    const [deletedItems, setDeletedItems] = useState(defaultDeletedItems);

    const allItems = useMemo(
      () => [...failedItems, ...newItems, ...deletedItems, ...passedItems],
      [newItems, passedItems, failedItems, deletedItems],
    );

    const filter = (input: string) => {
      if (worker == null) {
        return;
      }

      const value = input.trim();

      setFiltering(value !== '');

      worker.requestFilter({
        input: value,
        newItems: defaultNewItems,
        passedItems: defaultPassedItems,
        failedItems: defaultFailedItems,
        deletedItems: defaultDeletedItems,
      });
    };

    useEffect(() => {
      if (worker == null) {
        return;
      }

      worker.subscribe(WorkerEventType.RESULT_FILTER, (payload) => {
        setNewItems(payload.newItems);
        setPassedItems(payload.passedItems);
        setFailedItems(payload.failedItems);
        setDeletedItems(payload.deletedItems);
      });
    }, [worker]);

    return {
      newItems,
      passedItems,
      failedItems,
      deletedItems,
      allItems,
      filtering,
      filter,
    };
  },
);
