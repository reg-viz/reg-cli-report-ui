import { RegStructualItem } from './reg';

export enum WorkerEventType {
  // calculate
  INIT = 'init',
  REQUEST_CALC = 'req_calc',
  RESULT_CALC = 'res_calc',

  // filter
  REQUEST_FILTER = 'req_filter',
  RESULT_FILTER = 'res_filter',
}

type WorkerEventDataPayloadMap = {
  [WorkerEventType.INIT]: void;

  [WorkerEventType.REQUEST_CALC]: {
    raw: string;
    actualSrc: string;
    expectedSrc: string;
    img1: any; // TODO
    img2: any; // TODO
    seq: any; // TODO
  };
  [WorkerEventType.RESULT_CALC]: {
    img1: any; // TODO
    img2: any; // TODO
    seq: any; // TODO
  };

  [WorkerEventType.REQUEST_FILTER]: {
    newItems: RegStructualItem[];
    passedItems: RegStructualItem[];
    failedItems: RegStructualItem[];
    deletedItems: RegStructualItem[];
    input: string;
  };
  [WorkerEventType.RESULT_FILTER]: {
    newItems: RegStructualItem[];
    passedItems: RegStructualItem[];
    failedItems: RegStructualItem[];
    deletedItems: RegStructualItem[];
  };
};

export type WorkerEventDataPayload<T extends WorkerEventType> = WorkerEventDataPayloadMap[T];

export type WorkerEventData<T extends WorkerEventType> = WorkerEventDataPayload<T> extends void
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
