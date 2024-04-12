import type { RegEntity, Matching } from './reg';

export enum WorkerEventType {
  // calculate
  INIT_CALC = 'init',
  REQUEST_CALC = 'req_calc',
  RESULT_CALC = 'res_calc',

  // filter
  REQUEST_FILTER = 'req_filter',
  RESULT_FILTER = 'res_filter',
}

export type WorkerEventDataPayloadMap = {
  [WorkerEventType.INIT_CALC]: void;

  [WorkerEventType.REQUEST_CALC]: {
    seq: number;
    raw: string;
    actualSrc: string;
    expectedSrc: string;
    img1: ImageData;
    img2: ImageData;
  };
  [WorkerEventType.RESULT_CALC]: {
    seq: number;
    raw: string;
    actualSrc: string;
    expectedSrc: string;
    img1: ImageData;
    img2: ImageData;
    result: Matching;
  };

  [WorkerEventType.REQUEST_FILTER]: {
    newItems: RegEntity[];
    passedItems: RegEntity[];
    failedItems: RegEntity[];
    deletedItems: RegEntity[];
    input: string;
  };
  [WorkerEventType.RESULT_FILTER]: {
    newItems: RegEntity[];
    passedItems: RegEntity[];
    failedItems: RegEntity[];
    deletedItems: RegEntity[];
  };
};

export type WorkerEventDataPayload<T extends WorkerEventType> =
  WorkerEventDataPayloadMap[T];

export type WorkerEventData<T extends WorkerEventType> =
  WorkerEventDataPayload<T> extends void
    ? {
        type: T;
      }
    : {
        type: T;
        payload: WorkerEventDataPayload<T>;
      };

export type WorkerEvent = {
  [P in keyof WorkerEventDataPayloadMap]: {
    type: string;
    data: WorkerEventData<P>;
  };
}[keyof WorkerEventDataPayloadMap];
