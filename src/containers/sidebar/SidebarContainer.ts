import { createContainer } from 'unstated-next';
import { useState, useContext, useEffect, useMemo } from 'react';
import { toStructualItems } from '../../utils/transformer';
import { RegStructualItem } from '../../types/reg';
import { EntityContainer } from '../entity/EntityContainer';
import { WorkerContext } from '../../context/WorkerContext';
import { WorkerEventType } from '../../types/event';

export type SidebarValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  filter: (input: string) => void;
  newItems: RegStructualItem[];
  passedItems: RegStructualItem[];
  failedItems: RegStructualItem[];
  deletedItems: RegStructualItem[];
};

export const SidebarContainer = createContainer<SidebarValue>(() => {
  const worker = useContext(WorkerContext);
  const entities = EntityContainer.useContainer();

  const defaultNewItems = useMemo(() => toStructualItems(entities.newItems), [entities.newItems]);
  const defaultPassedItems = useMemo(() => toStructualItems(entities.passedItems), [entities.passedItems]);
  const defaultFailedItems = useMemo(() => toStructualItems(entities.failedItems), [entities.failedItems]);
  const defaultDeletedItems = useMemo(() => toStructualItems(entities.deletedItems), [entities.deletedItems]);

  const [newItems, setNewItems] = useState(defaultNewItems);
  const [passedItems, setPassedItems] = useState(defaultPassedItems);
  const [failedItems, setFailedItems] = useState(defaultFailedItems);
  const [deletedItems, setDeletedItems] = useState(defaultDeletedItems);

  const [isOpen, setOpen] = useState(true);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen(!isOpen);
  const filter = (input: string) => {
    if (worker == null) {
      return;
    }

    const value = input.trim();
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
    isOpen,
    open,
    close,
    toggle,
    filter,
    newItems,
    passedItems,
    failedItems,
    deletedItems,
  };
});
