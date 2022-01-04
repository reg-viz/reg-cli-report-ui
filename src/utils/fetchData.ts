import type { RegData, RegItem } from '../types/reg';

type RawRegJson = {
  actualDir: string;
  expectedDir: string;
  diffDir: string;
  failedItems: string[];
  newItems: string[];
  passedItems: string[];
  deletedItems: string[];
};

const string2Entity = (raw: string): RegItem => ({
  raw,
  encoded: encodeURIComponent(raw),
});

function convertRawJson2RegData(rawData: RawRegJson) {
  const regData: RegData = {
    ...rawData,
    deletedItems: rawData.deletedItems.map(string2Entity),
    failedItems: rawData.failedItems.map(string2Entity),
    newItems: rawData.newItems.map(string2Entity),
    passedItems: rawData.passedItems.map(string2Entity),
    hadPassed: rawData.passedItems.length > 0,
    hasDeleted: rawData.deletedItems.length > 0,
    hasFailed: rawData.failedItems.length > 0,
    hasNew: rawData.newItems.length > 0,
    links: [],
    type:
      rawData.deletedItems.length +
        rawData.newItems.length +
        rawData.failedItems.length ===
      0
        ? 'success'
        : 'danger',
    ximgdiffConfig: {
      enabled: false,
    },
  };
  return regData;
}

export async function fetchData(jsonUrl: string) {
  const urlObj = new URL(jsonUrl);
  urlObj.pathname = urlObj.pathname.replace(/\/[^/]+$/, '');
  const baseUri = urlObj.toString();
  const res = await fetch(jsonUrl);
  const raw = (await res.json()) as RawRegJson;
  const regData = convertRawJson2RegData(raw);
  return {
    ...regData,
    expectedDir: baseUri + '/' + regData.expectedDir.replace(/^\.\//, ''),
    actualDir: baseUri + '/' + regData.actualDir.replace(/^\.\//, ''),
    diffDir: baseUri + '/' + regData.diffDir.replace(/^\.\//, ''),
  } as RegData;
}
