import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { createRegEntity } from '../../mocks';
import type { RegEntity } from '../../types/reg';
import { Viewer } from './Viewer';

const defaultEntity = createRegEntity({
  id: 'id',
  variant: 'changed',
  name: 'filename.png',
  diff: 'https://placehold.it/438x178?text=diff',
  before: 'https://placehold.it/876x356?text=before',
  after: 'https://placehold.it/600x534?text=after',
});

const defaultProps = {
  total: 302,
  current: 2,
  entity: defaultEntity,
  matching: null,
  onPrevious: action('onPrevious') as any,
  onNext: action('onNext') as any,
  onRequestClose: action('onRequestClose') as any,
};

const Demo: React.FC = () => {
  const [entity, setEntity] = useState<RegEntity | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setEntity(defaultEntity);
        }}
      >
        open viewer
      </button>

      <Viewer
        {...defaultProps}
        entity={entity}
        onRequestClose={() => {
          setEntity(null);
        }}
      />
    </>
  );
};

export default {
  title: 'Viewer',
  decorators: [withPadding()],
};

export const Overview = () => <Demo />;

export const WithChanged = () => <Viewer {...defaultProps} />;

export const WithNew = () => (
  <Viewer
    {...defaultProps}
    entity={{
      ...defaultEntity,
      variant: 'new',
    }}
  />
);

export const WithDeleted = () => (
  <Viewer
    {...defaultProps}
    entity={{
      ...defaultEntity,
      variant: 'deleted',
    }}
  />
);

export const WithPassed = () => (
  <Viewer
    {...defaultProps}
    entity={{
      ...defaultEntity,
      variant: 'passed',
    }}
  />
);
