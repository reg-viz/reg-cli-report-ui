import type { RegEntity } from './types/reg';

export const createRegEntity = (properties: Partial<RegEntity>): RegEntity => ({
  id: '',
  variant: 'passed',
  name: '',
  diff: '',
  before: '',
  after: '',
  ...properties,
});
