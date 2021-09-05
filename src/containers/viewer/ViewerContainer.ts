import { createContainer } from 'unstated-next';
import type { Location } from 'history';
import { useState, useEffect, useContext, useRef } from 'react';
import qs from 'query-string';
import { EntityContainer } from '../entity/EntityContainer';
import type { RegEntity, Matching } from '../../types/reg';
import { WorkerContext } from '../../context/WorkerContext';
import type { WorkerEventDataPayload } from '../../types/event';
import { WorkerEventType } from '../../types/event';
import { useHistory } from '../../hooks/useHistory';

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
  markersEnabled: boolean;
  open: (id: string) => void;
  close: () => void;
  next: () => void;
  previous: () => void;
  toggleMarkers: () => void;
};

export const ViewerContainer = createContainer<ViewerValue>(() => {
  const history = useHistory();
  const worker = useContext(WorkerContext);

  const { allItems } = EntityContainer.useContainer();

  const seqRef = useRef(0);
  const [current, setCurrent] = useState<Current>(defaultCurrent);
  const [markersEnabled, setMarkersEnabled] = useState(true);

  const open = (id: string) => {
    history.push({ search: `?id=${id}` });
  };

  const close = () => {
    history.push({ search: '' });
  };

  const next = () => {
    if (current.index + 1 < allItems.length) {
      open(allItems[current.index + 1].id);
    } else {
      open(allItems[0].id);
    }
  };

  const previous = () => {
    if (current.index - 1 >= 0) {
      open(allItems[current.index - 1].id);
    } else {
      open(allItems[allItems.length - 1].id);
    }
  };

  const toggleMarkers = () => {
    const value = !markersEnabled;
    setMarkersEnabled(value);

    if (!value && current.matching != null) {
      setCurrent((cur) => ({
        ...cur,
        matching: null,
      }));
    }
  };

  useEffect(() => {
    const { entity } = current;

    if (worker == null || entity == null || markersEnabled === false) {
      return;
    }

    const listener = (
      payload: WorkerEventDataPayload<WorkerEventType.RESULT_CALC>,
    ) => {
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
  }, [markersEnabled, worker, current]);

  useEffect(() => {
    const sync = (location: Location) => {
      const query = qs.parse(location.search, { decode: false }); // get raw `id` parameter.
      const id = query.id;

      if (typeof id === 'string' && id !== '') {
        const index = allItems.findIndex((entity) => entity.id === id);
        if (index > -1) {
          setCurrent({
            entity: allItems[index],
            index,
            matching: null,
          });
        }
      } else {
        setCurrent(defaultCurrent);
      }
    };

    sync(history.location);

    return history.listen(({ location }) => {
      sync(location);
    });
  }, [history]); /* eslint-disable-line react-hooks/exhaustive-deps */

  return {
    current,
    markersEnabled,
    open,
    close,
    next,
    previous,
    toggleMarkers,
  };
});
