import { createContainer } from 'unstated-next';
import { useState, useContext, useEffect } from 'react';
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

  const [newItems, setNewItems] = useState(toStructualItems(entities.newItems));
  const [passedItems, setPassedItems] = useState(toStructualItems(entities.passedItems));
  const [failedItems, setFailedItems] = useState(toStructualItems(entities.failedItems));
  const [deletedItems, setDeletedItems] = useState(toStructualItems(entities.deletedItems));

  const [isOpen, setOpen] = useState(true);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen(!isOpen);
  const filter = (input: string) => {
    if (worker == null) {
      return;
    }

    const value = input.trim();

    if (value !== '') {
      worker.requestFilter({
        input,
        newItems,
        passedItems,
        failedItems,
        deletedItems,
      });
    } else {
      setNewItems(toStructualItems(entities.newItems));
      setPassedItems(toStructualItems(entities.passedItems));
      setFailedItems(toStructualItems(entities.failedItems));
      setDeletedItems(toStructualItems(entities.deletedItems));
    }
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
