/* eslint-disable import/newline-after-import */
import FuzzySearch from 'fuzzy-search';
import { ModuleClass } from './detector-wrapper';
import { WorkerEvent, WorkerEventType, WorkerEventData } from './types/event';
const ximgdiffVersionString = require('x-img-diff-js/package.json').version as string;
/* eslint-enable */

const _self = self as any;

function version2number(version: string) {
  const [, major, minor, patch] = version.match(/^(\d*)\.(\d*)\.(\d*)/) as [string, string, string, string];

  return +major * 10000 + +minor * 100 + +patch;
}

let loaded = false;
let lastCalcData: any = null; // TODO typedef

const calc = ({
  payload: { raw, img1, img2, actualSrc, expectedSrc, seq },
}: WorkerEventData<WorkerEventType.REQUEST_CALC>) => {
  const diffResult = _self.Module.detectDiff(_self.Module, img1, img2, {});

  _self.postMessage({
    type: WorkerEventType.RESULT_CALC,
    seq,
    raw,
    actualSrc,
    expectedSrc,
    result: {
      ...diffResult,
      images: [{ width: img1.width, height: img1.height }, { width: img2.width, height: img2.height }],
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

  const keys = ['name'];
  const opts = { caseSensitive: true };

  const newSearcher = new FuzzySearch(newItems, keys, opts);
  const passedSearcher = new FuzzySearch(passedItems, keys, opts);
  const failedSearcher = new FuzzySearch(failedItems, keys, opts);
  const deletedSearcher = new FuzzySearch(deletedItems, keys, opts);

  _self.postMessage({
    type: WorkerEventType.RESULT_FILTER,
    payload: {
      newItems: newSearcher.search(input),
      passedItems: passedSearcher.search(input),
      failedItems: failedSearcher.search(input),
      deletedItems: deletedSearcher.search(input),
    },
  });
};

_self.Module = new ModuleClass({
  version: version2number(ximgdiffVersionString),
  wasmUrl: _self.wasmUrl,
  init: () => {
    loaded = true;
    if (lastCalcData) {
      calc(lastCalcData);
    }
    _self.postMessage({ type: WorkerEventType.INIT });
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

    default:
  }
});
