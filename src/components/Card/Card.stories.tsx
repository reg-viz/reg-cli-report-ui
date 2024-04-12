import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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

type Component = typeof Card;
type Story = StoryObj<Component>;

export default {
  component: Card,
  args: {
    href: '?id=storybook',
    entity: defaultEntity,
    menus: [],
    onCopy: action('onCopy'),
  },
} satisfies Meta<Component>;

export const Overview: Story = {};

export const WithNew: Story = {
  args: {
    entity: {
      ...defaultEntity,
      variant: 'new',
    },
  },
};

export const WithDeleted: Story = {
  args: {
    entity: {
      ...defaultEntity,
      variant: 'deleted',
    },
  },
};

export const WithPassed: Story = {
  args: {
    entity: {
      ...defaultEntity,
      variant: 'passed',
    },
  },
};
