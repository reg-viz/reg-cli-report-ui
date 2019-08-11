export type RegVariant = 'passed' | 'new' | 'changed' | 'deleted';

export type XIMGDiffConfig = {
  enabled: boolean;
  workerUrl?: string;
};

export type RegItem = {
  raw: string;
  encoded: string;
};

export type RegData = {
  type: 'success' | 'danger';
  actualDir: string;
  expectedDir: string;
  diffDir: string;
  hasNew: boolean;
  hadPassed: boolean;
  hasFailed: boolean;
  hasDeleted: boolean;
  newItems: RegItem[];
  passedItems: RegItem[];
  failedItems: RegItem[];
  deletedItems: RegItem[];
  ximgdiffConfig?: XIMGDiffConfig;
};

export type RegEntity = {
  id: string;
  variant: RegVariant;
  name: string;
  diff: string;
  before: string;
  after: string;
};

export type RegStructualItem = {
  id: string;
  path: string;
  name: string;
  child?: RegStructualItem;
};
