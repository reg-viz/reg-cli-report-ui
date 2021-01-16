import { storiesOf } from '@storybook/react';
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

const Overview: React.FC = () => {
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

storiesOf('Viewer', module)
  .addDecorator(withPadding())
  .add('overview', () => <Overview />)
  .add('with changed', () => <Viewer {...defaultProps} />)
  .add('with new', () => (
    <Viewer
      {...defaultProps}
      entity={{
        ...defaultEntity,
        variant: 'new',
      }}
    />
  ))
  .add('with deleted', () => (
    <Viewer
      {...defaultProps}
      entity={{
        ...defaultEntity,
        variant: 'deleted',
      }}
    />
  ))
  .add('with passed', () => (
    <Viewer
      {...defaultProps}
      entity={{
        ...defaultEntity,
        variant: 'passed',
      }}
    />
  ));
