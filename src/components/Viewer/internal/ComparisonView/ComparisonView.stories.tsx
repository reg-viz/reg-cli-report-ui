import React from 'react';
import { storiesOf } from '@storybook/react';
import type { Props } from './ComparisonView';
import { ComparisonView } from './ComparisonView';

const defaults: Props = {
  entity: {
    id: 'id',
    variant: 'changed',
    name: 'name',
    diff: 'diff',
    before: 'before',
    after: 'after',
  },
  matching: null,
  defaultMode: 'slide',
};

storiesOf('ComparisonView', module).add('with slide', () => (
  <ComparisonView {...defaults} />
));
