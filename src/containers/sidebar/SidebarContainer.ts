import { createContainer } from 'unstated-next';
import { useState, useMemo, useEffect } from 'react';
import { toStructualItems } from '../../utils/transformer';
import type { RegStructualItem, RegLink } from '../../types/reg';
import { EntityContainer } from '../entity/EntityContainer';
import { useMedia } from '../../hooks/useMedia';
import { BreakPoint } from '../../styles/variables';

export type SidebarValue = {
  isDesktop: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  newItems: RegStructualItem[];
  passedItems: RegStructualItem[];
  failedItems: RegStructualItem[];
  deletedItems: RegStructualItem[];
  links: RegLink[];
};

export const SidebarContainer = createContainer<SidebarValue, RegLink[]>(
  (initialState) => {
    const entities = EntityContainer.useContainer();

    const newItems = useMemo(
      () => toStructualItems(entities.newItems),
      [entities.newItems],
    );

    const passedItems = useMemo(
      () => toStructualItems(entities.passedItems),
      [entities.passedItems],
    );

    const failedItems = useMemo(
      () => toStructualItems(entities.failedItems),
      [entities.failedItems],
    );

    const deletedItems = useMemo(
      () => toStructualItems(entities.deletedItems),
      [entities.deletedItems],
    );

    const isDesktop = useMedia(`(min-width: ${BreakPoint.MEDIUM}px)`);
    const [isOpen, setOpen] = useState(() => isDesktop);
    const open = () => setOpen(true);
    const close = () => setOpen(false);
    const toggle = () => setOpen(!isOpen);

    useEffect(() => {
      setOpen(isDesktop);
    }, [isDesktop]);

    return {
      isDesktop,
      isOpen,
      open,
      close,
      toggle,
      newItems,
      passedItems,
      failedItems,
      deletedItems,
      links: initialState != null ? initialState : [],
    };
  },
);
