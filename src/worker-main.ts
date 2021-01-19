/* eslint-disable no-console, import/newline-after-import */
import Fuse from 'fuse.js';
import { ModuleClass } from './detector-wrapper';
import type { WorkerEvent, WorkerEventData } from './types/event';
import { WorkerEventType } from './types/event';
import type { RegEntity } from './types/reg';
const ximgdiffVersionString = require('x-img-diff-js/package.json')
  .version as string;

const _self = self as any;

// // TODO Dynamic embed
// _self.wasmUrl = '/detector.wasm';
// // TODO Dynamic embed

function version2number(version: string) {
  const [, major, minor, patch] = version.match(/^(\d*)\.(\d*)\.(\d*)/) as [
    string,
    string,
    string,
    string,
  ];

  return +major * 10000 + +minor * 100 + +patch;
}

let loaded = false;
let lastCalcData: WorkerEventData<WorkerEventType.REQUEST_CALC> | null = null;

const calc = ({
  payload: { raw, img1, img2, actualSrc, expectedSrc, seq },
}: WorkerEventData<WorkerEventType.REQUEST_CALC>) => {
  const diffResult = _self.Module.detectDiff(_self.Module, img1, img2, {});

  _self.postMessage({
    type: WorkerEventType.RESULT_CALC,
    payload: {
      seq,
      raw,
      actualSrc,
      expectedSrc,
      result: {
        ...diffResult,
        images: [
          { width: img1.width, height: img1.height },
          { width: img2.width, height: img2.height },
        ],
      },
    },
  });
};

const filter = ({
  payload: { input, newItems, passedItems, failedItems, deletedItems },
}: WorkerEventData<WorkerEventType.REQUEST_FILTER>) => {
  // Return all items when empty input
  if (!input) {
    return _self.postMessage({
      type: WorkerEventType.RESULT_FILTER,
      payload: { newItems, passedItems, failedItems, deletedItems },
    });
  }

  const search = (entities: RegEntity[]) => {
    const fuse = new Fuse(entities, {
      isCaseSensitive: false,
      keys: ['name'],
      threshold: 0.3,
    });

    return fuse.search(input).map(({ item }) => item);
  };

  _self.postMessage({
    type: WorkerEventType.RESULT_FILTER,
    payload: {
      newItems: search(newItems),
      passedItems: search(passedItems),
      failedItems: search(failedItems),
      deletedItems: search(deletedItems),
    },
  });
};

_self.Module = new ModuleClass({
  version: version2number(ximgdiffVersionString),
  wasmUrl: _self.wasmUrl,
  init: () => {
    loaded = true;
    if (lastCalcData != null) {
      calc(lastCalcData);
    }
    _self.postMessage({ type: WorkerEventType.INIT_CALC });
  },
});

_self.addEventListener('message', ({ data }: WorkerEvent) => {
  console.log('Received: ', data);

  switch (data.type) {
    case WorkerEventType.REQUEST_CALC:
      if (loaded) {
        calc(data);
      } else {
        lastCalcData = data;
      }
      break;

    case WorkerEventType.REQUEST_FILTER:
      filter(data);
      break;
  }
});
//
// // TODO Dynamic embed
// importScripts('/cv-wasm_browser.js');
// // TODO Dynamic embed
