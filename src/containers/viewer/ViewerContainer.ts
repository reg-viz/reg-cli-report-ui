import { createContainer } from 'unstated-next';
import { useState, useEffect, useContext, useRef } from 'react';
import { EntityContainer } from '../entity/EntityContainer';
import { RegEntity, Matching } from '../../types/reg';
import { WorkerContext } from '../../context/WorkerContext';
import { WorkerEventType, WorkerEventDataPayload } from '../../types/event';

type Current = {
  entity: RegEntity | null;
  matching: Matching | null;
  index: number;
};

const defaultCurrent: Current = {
  entity: null,
  matching: null,
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
  const worker = useContext(WorkerContext);

  const { allItems } = EntityContainer.useContainer();

  const seqRef = useRef(0);
  const [current, setCurrent] = useState<Current>(defaultCurrent);

  const open = (id: string) => {
    const index = allItems.findIndex((entity) => entity.id === id);
    if (index > -1) {
      setCurrent({
        entity: allItems[index],
        index,
        matching: null,
      });
    }
  };

  const close = () => setCurrent(defaultCurrent);

  const next = () => {
    if (current.index + 1 < allItems.length) {
      setCurrent({
        entity: allItems[current.index + 1],
        index: current.index + 1,
        matching: null,
      });
    } else {
      setCurrent({
        entity: allItems[0],
        index: 0,
        matching: null,
      });
    }
  };

  const previous = () => {
    if (current.index - 1 >= 0) {
      setCurrent({
        entity: allItems[current.index - 1],
        index: current.index - 1,
        matching: null,
      });
    } else {
      setCurrent({
        entity: allItems[allItems.length - 1],
        index: allItems.length - 1,
        matching: null,
      });
    }
  };

  useEffect(() => {
    const { entity } = current;

    if (worker == null || entity == null) {
      return;
    }

    const listener = (payload: WorkerEventDataPayload<WorkerEventType.RESULT_CALC>) => {
      if (seqRef.current === payload.seq) {
        setCurrent({
          ...current,
          matching: payload.result,
        });
      }
    };

    worker.subscribe(WorkerEventType.RESULT_CALC, listener);

    if (current.matching == null && entity.variant === 'changed') {
      seqRef.current = worker.requestCalc({
        raw: entity.name,
        actualSrc: entity.after,
        expectedSrc: entity.before,
      });
    }

    return () => worker.unsubscribe(WorkerEventType.RESULT_CALC, listener);
  }, [worker, current]);

  return {
    current,
    open,
    close,
    next,
    previous,
  };
});
