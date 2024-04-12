import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Image } from './';

type Component = typeof Image;
type Story = StoryObj<Component>;

export default {
  component: Image,
} satisfies Meta<Component>;

export const Overview: Story = {
  args: {
    width: 500,
    height: 200,
    src: 'https://via.placeholder.com/500x200',
  },
};

export const WithLazy: Story = {
  render: () => (
    <>
      <div style={{ paddingTop: '200vh' }} />
      <Image
        src="https://via.placeholder.com/2000x600"
        lazy={true}
        width="100%"
        height="30%"
        fit="contain"
      />
      <div style={{ paddingTop: '200vh' }} />
    </>
  ),
};
