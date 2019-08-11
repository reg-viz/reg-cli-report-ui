import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { EntityContainer } from '../entity/EntityContainer';
import { RegEntity } from '../../types/reg';

type Current = {
  entity: RegEntity | null;
  index: number;
};

const defaultCurrent: Current = {
  entity: null,
  index: -1,
};

export type ViewerValue = {
  current: Current;
  open: (id: string) => void;
  close: () => void;
  next: () => void;
  previous: () => void;
};

export const ViewerContainer = createContainer<ViewerValue>(() => {
  const { allItems } = EntityContainer.useContainer();

  const [current, setCurrent] = useState<Current>(defaultCurrent);

  const open = (id: string) => {
    const index = allItems.findIndex((entity) => entity.id === id);
    if (index > -1) {
      setCurrent({ entity: allItems[index], index });
    }
  };

  const close = () => setCurrent(defaultCurrent);

  const next = () => {
    if (current.index + 1 < allItems.length) {
      setCurrent({ entity: allItems[current.index + 1], index: current.index + 1 });
    } else {
      setCurrent({ entity: allItems[0], index: 0 });
    }
  };

  const previous = () => {
    if (current.index - 1 >= 0) {
      setCurrent({ entity: allItems[current.index - 1], index: current.index - 1 });
    } else {
      setCurrent({ entity: allItems[allItems.length - 1], index: allItems.length - 1 });
    }
  };

  return {
    current,
    open,
    close,
    next,
    previous,
  };
});
