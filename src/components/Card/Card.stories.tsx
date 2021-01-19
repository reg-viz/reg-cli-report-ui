import React from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
import { createRegEntity } from '../../mocks';
import { Card } from './';

const defaultEntity = createRegEntity({
  id: 'id',
  variant: 'changed',
  name: 'filename.png',
  diff: 'https://via.placeholder.com/700x400?text=diff',
  before: 'https://via.placeholder.com/700x400?text=before',
  after: 'https://via.placeholder.com/700x400?text=after',
});

const defaultProps = {
  href: '?id=storybook',
  entity: defaultEntity,
  menus: [],
  onCopy: action('onCopy'),
};

export default {
  title: 'Card',
  decorators: [withPadding()],
};

export const withChanged = () => <Card {...defaultProps} />;

export const WithNew = () => (
  <Card
    {...defaultProps}
    entity={{
      ...defaultEntity,
      variant: 'new',
    }}
  />
);

export const WithDeleted = () => (
  <Card
    {...defaultProps}
    entity={{
      ...defaultEntity,
      variant: 'deleted',
    }}
  />
);

export const WithPassed = () => (
  <Card
    {...defaultProps}
    entity={{
      ...defaultEntity,
      variant: 'passed',
    }}
  />
);
