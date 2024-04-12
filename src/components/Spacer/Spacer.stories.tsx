import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Spacer } from './';

const Bar = () => <div style={{ height: 50, background: '#333' }} />;

type Component = typeof Spacer;
type Story = StoryObj<Component>;

export default {
  component: Spacer,
} satisfies Meta<Component>;

export const WithMargin: Story = {
  render: () => (
    <>
      <Bar />
      <Spacer variant="margin" x={1} />
      <Bar />
      <Spacer variant="margin" x={2} />
      <Bar />
      <Spacer variant="margin" x={3} />
      <Bar />
      <Spacer variant="margin" x={4} />
      <Bar />
      <Spacer variant="margin" x={5} />
      <Bar />
    </>
  ),
};

export const WithPadding: Story = {
  render: () => (
    <>
      <Bar />
      <Spacer variant="padding" x={1} />
      <Bar />
      <Spacer variant="padding" x={2} />
      <Bar />
      <Spacer variant="padding" x={3} />
      <Bar />
      <Spacer variant="padding" x={4} />
      <Bar />
      <Spacer variant="padding" x={5} />
      <Bar />
    </>
  ),
};
