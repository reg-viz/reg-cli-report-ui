export type RegVariant = 'passed' | 'new' | 'changed' | 'deleted';

export type XIMGDiffConfig = {
  enabled: boolean;
  workerUrl?: string;
};

export type FlakeData = {
  modificationCount?: number;
  totalCommitCount?: number;
  periodInDays?: number;
};

export type RegItem = {
  raw: string;
  encoded: string;
} & FlakeData;

export type RegLink = {
  href: string;
  label: string;
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
  links?: RegLink[];
  diffImageExtension?: 'webp' | 'png';
};

export type RegEntity = {
  id: string;
  variant: RegVariant;
  name: string;
  diff: string;
  before: string;
  after: string;
} & FlakeData;

export type RegStructualItem = {
  id: string;
  path: string;
  name: string;
  children: RegStructualItem[];
};

export type Rect = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type DetectMatch = {
  bounding: Rect;
  center: Rect;
  diffMarkers: Rect[];
};

export type Matching = {
  images: Size[];
  matches: DetectMatch[][];
  strayingRects: Rect[][];
};
