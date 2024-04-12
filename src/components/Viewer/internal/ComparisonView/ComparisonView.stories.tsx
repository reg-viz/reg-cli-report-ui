import type { Meta, StoryObj } from '@storybook/react';
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

type Component = typeof ComparisonView;
type Story = StoryObj<Component>;

export default {
  component: ComparisonView,
  args: {
    entity: defaultEntity,
    matching: null,
    defaultMode: 'slide',
  },
} satisfies Meta<Component>;

export const WithSlide: Story = {};

export const WithDiff: Story = {
  args: {
    defaultMode: 'diff',
  },
};

export const WithTwoUp: Story = {
  args: {
    defaultMode: '2up',
  },
};

export const WithBlend: Story = {
  args: {
    defaultMode: 'blend',
  },
};

export const WithToggle: Story = {
  args: {
    defaultMode: 'toggle',
  },
};

export const WithLargeAfterSlide: Story = {
  args: {
    entity: largeAfterEntity,
  },
};

export const WithLargeAfterTwoUp: Story = {
  args: {
    defaultMode: '2up',
    entity: largeAfterEntity,
  },
};

export const WithLargeAfterBlend: Story = {
  args: {
    defaultMode: 'blend',
    entity: largeAfterEntity,
  },
};

export const WithLargeAfterToggle: Story = {
  args: {
    defaultMode: 'toggle',
    entity: largeAfterEntity,
  },
};
