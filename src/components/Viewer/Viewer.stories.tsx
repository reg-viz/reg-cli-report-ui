import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { createRegEntity } from '../../mocks';
import type { RegEntity } from '../../types/reg';
import { Viewer } from './Viewer';

const defaultEntity = createRegEntity({
  id: 'id',
  variant: 'changed',
  name: 'filename.png',
  diff: 'https://via.placeholder.com/438x178?text=diff',
  before: 'https://via.placeholder.com/876x356?text=before',
  after: 'https://via.placeholder.com/600x534?text=after',
});

type Component = typeof Viewer;
type Story = StoryObj<Component>;

export default {
  component: Viewer,
  args: {
    total: 302,
    current: 2,
    entity: defaultEntity,
    matching: null,
    markersEnabled: true,
    onPrevious: action('onPrevious') as any,
    onNext: action('onNext') as any,
    onRequestClose: action('onRequestClose') as any,
    onMarkersToggle: action('onMarkersToggle') as any,
  },
} satisfies Meta<Component>;

export const Overview: Story = {
  render: (args) => {
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
          {...args}
          entity={entity}
          onRequestClose={() => {
            setEntity(null);
          }}
        />
      </>
    );
  },
};

export const WithChanged: Story = {};

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
