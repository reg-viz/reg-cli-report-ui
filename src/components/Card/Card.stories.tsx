import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
import { createRegEntity } from '../../mocks';
import { Card, CardDimmer } from './';

const defaultEntity = createRegEntity({
  id: 'id',
  variant: 'changed',
  name: 'filename.png',
  diff: 'https://placehold.it/700x400?text=diff',
  before: 'https://placehold.it/700x400?text=before',
  after: 'https://placehold.it/700x400?text=after',
});

const defaultProps = {
  entity: defaultEntity,
  menus: [],
  onClick: action('onClick'),
  onCopy: action('onCopy'),
};

storiesOf('Card', module)
  .addDecorator(withPadding())
  .add('with changed', () => <Card {...defaultProps} />)
  .add('with new', () => (
    <Card
      {...defaultProps}
      entity={{
        ...defaultEntity,
        variant: 'new',
      }}
    />
  ))
  .add('with deleted', () => (
    <Card
      {...defaultProps}
      entity={{
        ...defaultEntity,
        variant: 'deleted',
      }}
    />
  ))
  .add('with passed', () => (
    <Card
      {...defaultProps}
      entity={{
        ...defaultEntity,
        variant: 'passed',
      }}
    />
  ));

storiesOf('CardDimmer', module)
  .add('with changed', () => <CardDimmer variant="changed" />) 
  .add('with new', () => <CardDimmer variant="new" />) 
  .add('with deleted', () => <CardDimmer variant="deleted" />) 
  .add('with passed', () => <CardDimmer variant="passed" />) 
