import type { Location } from 'history';
import qs from 'query-string';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from '../../hooks/useHistory';
import { useEntities } from '../../states/entity';
import { useWorkerClient } from '../../states/worker';
import type { WorkerEventDataPayload } from '../../types/event';
import { WorkerEventType } from '../../types/event';
import type { Matching, RegEntity } from '../../types/reg';
import { Viewer as Component } from './Viewer';

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

export type Props = {};

const Renderer = () => {
  const history = useHistory();
  const { allItems } = useEntities();
  const worker = useWorkerClient();

  const seqRef = useRef(0);
  const [current, setCurrent] = useState<Current>(defaultCurrent);
  const [markersEnabled, setMarkersEnabled] = useState(true);

  useEffect(() => {
    const { entity } = current;

    if (entity == null || markersEnabled === false) {
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
  }, [worker, current, markersEnabled]);

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

  const open = useCallback(
    (id: string) => {
      history.push({ search: `?id=${id}` });
    },
    [history],
  );

  const handleNext = useCallback(() => {
    const index = current.index + 1;
    if (index < allItems.length) {
      open(allItems[index].id);
    } else {
      open(allItems[0].id);
    }
  }, [open, allItems, current]);

  const handlePrevious = useCallback(() => {
    const index = current.index - 1;
    if (index >= 0) {
      open(allItems[index].id);
    } else {
      open(allItems[allItems.length - 1].id);
    }
  }, [open, allItems, current]);

  const handleClose = useCallback(() => {
    history.push({ search: '' });
  }, [history]);

  const handleMarkersToggle = useCallback(() => {
    const value = !markersEnabled;
    setMarkersEnabled(value);

    if (!value && current.matching != null) {
      setCurrent((cur) => ({
        ...cur,
        matching: null,
      }));
    }
  }, [markersEnabled, current]);

  return (
    <Component
      total={allItems.length}
      current={current.index + 1}
      entity={current.entity}
      matching={current.matching}
      markersEnabled={markersEnabled}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onRequestClose={handleClose}
      onMarkersToggle={handleMarkersToggle}
    />
  );
};

export const Viewer = () => <Renderer />;
