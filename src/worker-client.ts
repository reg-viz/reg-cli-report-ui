import { EventEmitter } from 'events';
import { debounce } from 'debounce';
import type { XIMGDiffConfig } from './types/reg';
import type { WorkerEvent, WorkerEventDataPayload } from './types/event';
import { WorkerEventType } from './types/event';

const fromCanvas = (img: HTMLImageElement): ImageData => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (ctx == null) {
    throw new Error('An unexpected error has occurred');
  }

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const loadImage = (src: string): Promise<ImageData> =>
  new Promise((resolve) => {
    const img = new Image();

    img.addEventListener(
      'load',
      () => {
        resolve(fromCanvas(img));
      },
      false,
    );

    img.src = src;
  });

export class WorkerClient {
  private _cache: {
    [key: string]: WorkerEventDataPayload<WorkerEventType.RESULT_CALC>;
  } = {};
  private _seq = 0;
  private _emitter = new EventEmitter();
  private _worker: Worker | null = null;

  public start(config: XIMGDiffConfig) {
    const { enabled, workerUrl } = config;
    if (!enabled || !workerUrl) {
      return;
    }

    this._worker = new Worker(workerUrl);

    this._worker.addEventListener('message', ({ data }: WorkerEvent) => {
      switch (data.type) {
        case WorkerEventType.RESULT_CALC:
          this._cache[data.payload.raw] = data.payload;
          this._emitter.emit(WorkerEventType.RESULT_CALC, data.payload);
          break;

        case WorkerEventType.RESULT_FILTER:
          this._emitter.emit(WorkerEventType.RESULT_FILTER, data.payload);
          break;
      }
    });
  }

  public requestCalc(
    payload: Pick<
      WorkerEventDataPayload<WorkerEventType.REQUEST_CALC>,
      'raw' | 'actualSrc' | 'expectedSrc'
    >,
  ) {
    if (this._worker == null) {
      return 0;
    }

    const seq = ++this._seq;

    if (this._cache[payload.raw]) {
      setTimeout(
        () =>
          this._emitter.emit(WorkerEventType.RESULT_CALC, {
            ...this._cache[payload.raw],
            seq,
          }),
        10,
      );
      return seq;
    }

    Promise.all([
      loadImage(payload.actualSrc),
      loadImage(payload.expectedSrc),
    ]).then(([img1, img2]) => {
      (this._worker as Worker).postMessage(
        {
          type: WorkerEventType.REQUEST_CALC,
          payload: {
            img1,
            img2,
            seq,
            ...payload,
          },
        },
        [img1.data.buffer, img2.data.buffer],
      );
    });

    return seq;
  }

  public requestFilter = debounce(
    (payload: WorkerEventDataPayload<WorkerEventType.REQUEST_FILTER>) => {
      if (this._worker == null) {
        return;
      }

      this._worker.postMessage({
        type: WorkerEventType.REQUEST_FILTER,
        payload,
      });
    },
    200,
  );

  public subscribe<T extends WorkerEventType>(
    type: T,
    listener: (payload: WorkerEventDataPayload<T>) => void,
  ) {
    this._emitter.on(type, listener);
  }

  public unsubscribe<T extends WorkerEventType>(
    type: T,
    listener: (payload: WorkerEventDataPayload<T>) => void,
  ) {
    this._emitter.off(type, listener);
  }
}
