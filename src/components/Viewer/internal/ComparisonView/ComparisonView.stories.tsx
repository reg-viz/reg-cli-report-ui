import React from 'react';
import { createRegEntity } from '../../../../mocks';
import { ComparisonView } from './ComparisonView';

const defaultEntity = createRegEntity({
  id: 'id',
  variant: 'changed',
  name: 'filename.png',
  diff: 'https://via.placeholder.com/700x400?text=diff',
  before: 'https://via.placeholder.com/700x400/FF0000/FFFFFF?text=before',
  after: 'https://via.placeholder.com/800x700?text=after',
});

const largeAfterEntity = createRegEntity({
  id: 'id',
  variant: 'changed',
  name: 'filename.png',
  diff: 'https://via.placeholder.com/700x400?text=diff',
  before: 'https://via.placeholder.com/800x700/FF0000/FFFFFF?text=before',
  after: 'https://via.placeholder.com/700x400?text=after',
});

const defaultProps = {
  entity: defaultEntity,
  matching: null,
  defaultMode: 'slide',
};

export default {
  title: 'Viewer/internal/ComparisonView',
};

export const WithSlide = () => <ComparisonView {...defaultProps} />;

export const WithDiff = () => (
  <ComparisonView {...defaultProps} defaultMode="diff" />
);

export const WithTwoUp = () => (
  <ComparisonView {...defaultProps} defaultMode="2up" />
);

export const WithBlend = () => (
  <ComparisonView {...defaultProps} defaultMode="blend" />
);

export const WithToggle = () => (
  <ComparisonView {...defaultProps} defaultMode="toggle" />
);

export const WithLargeAfterSlide = () => (
  <ComparisonView {...defaultProps} entity={largeAfterEntity} />
);

export const WithLargeAfterTwoUp = () => (
  <ComparisonView
    {...defaultProps}
    defaultMode="2up"
    entity={largeAfterEntity}
  />
);

export const WithLargeAfterBlend = () => (
  <ComparisonView
    {...defaultProps}
    defaultMode="blend"
    entity={largeAfterEntity}
  />
);

export const WithLargeAfterToggle = () => (
  <ComparisonView
    {...defaultProps}
    defaultMode="toggle"
    entity={largeAfterEntity}
  />
);
