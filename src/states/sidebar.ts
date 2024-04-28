import { atom, useAtom, useAtomValue } from 'jotai';
import { useCallback, useMemo } from 'react';
import type { RegLink } from '../types/reg';
import { toStructualItems } from '../utils/transformer';
import { BreakPoint } from '../styles/variables.css';
import { useEntities } from './entity';

const openAtom = atom(
  window.matchMedia(`(min-width: ${BreakPoint.MEDIUM}px)`).matches,
);

const linksAtom = atom<RegLink[]>([]);

export const useSidebarState = () => {
  const isOpen = useAtomValue(openAtom);
  const links = useAtomValue(linksAtom);

  return {
    isOpen,
    links,
  };
};

export const useSidebarMutators = () => {
  const [, setIsOpen] = useAtom(openAtom);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return {
    open,
    close,
    toggle,
  };
};

export const useSidebarEntities = () => {
  const entity = useEntities();

  const newItems = useMemo(
    () => toStructualItems(entity.newItems),
    [entity.newItems],
  );

  const passedItems = useMemo(
    () => toStructualItems(entity.passedItems),
    [entity.passedItems],
  );

  const failedItems = useMemo(
    () => toStructualItems(entity.failedItems),
    [entity.failedItems],
  );

  const deletedItems = useMemo(
    () => toStructualItems(entity.deletedItems),
    [entity.deletedItems],
  );

  return {
    newItems,
    passedItems,
    failedItems,
    deletedItems,
  };
};
