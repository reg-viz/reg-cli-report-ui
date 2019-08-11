import { EventEmitter } from 'events';
import { debounce } from 'debounce';
import { XIMGDiffConfig } from './types/reg';
import { WorkerEventType, WorkerEvent, WorkerEventDataPayload } from './types/event';

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
  private _cache: { [key: string]: any } = {}; // TODO typedef
  private _seq = 0;
  private _emitter = new EventEmitter();
  private _worker: Worker | null = null;

  public start(config: XIMGDiffConfig) {
    const { enabled, workerUrl } = config;
    if (!enabled || !workerUrl) {
      return;
    }

    this._worker = new Worker(workerUrl);

    // TODO typedef
    this._worker.addEventListener('message', ({ data }: WorkerEvent) => {
      switch (data.type) {
        // TODO implement
        case WorkerEventType.RESULT_CALC:
          // this.pushResult(e.data);
          // public pushResult<T extends WorkerEventType>(type: T, data: WorkerEventData<T>['payload']) {
          //   this._cache[
          //   // this._cache[data.raw] = data;
          //   // this._emitter.emit('result', data);
          // }
          break;

        case WorkerEventType.RESULT_FILTER:
          this._emitter.emit(WorkerEventType.RESULT_FILTER, data.payload);
          break;
      }
    });
  }

  public requestCalc(req: WorkerEventDataPayload<WorkerEventType.REQUEST_CALC>) {
    if (this._worker == null) {
      return;
    }

    const seq = ++this._seq;

    if (this._cache[req.raw]) {
      setTimeout(() => this._emitter.emit(WorkerEventType.RESULT_CALC, { ...this._cache[req.raw], seq }), 10);
      return seq;
    }

    Promise.all([loadImage(req.actualSrc), loadImage(req.expectedSrc)]).then(([img1, img2]) => {
      (this._worker as Worker).postMessage(
        {
          type: WorkerEventType.REQUEST_CALC,
          img1,
          img2,
          seq,
          ...req,
        },
        [img1.data.buffer, img2.data.buffer],
      );
    });

    return seq;
  }

  public requestFilter = debounce((payload: WorkerEventDataPayload<WorkerEventType.REQUEST_FILTER>) => {
    if (this._worker == null) {
      return;
    }

    this._worker.postMessage({
      type: WorkerEventType.REQUEST_FILTER,
      payload,
    });
  }, 200);

  public subscribe<T extends WorkerEventType>(type: T, listener: (payload: WorkerEventDataPayload<T>) => void) {
    this._emitter.on(type, listener);
  }

  public unsubscribe<T extends WorkerEventType>(type: T, listener: (payload: WorkerEventDataPayload<T>) => void) {
    this._emitter.off(type, listener);
  }
}
