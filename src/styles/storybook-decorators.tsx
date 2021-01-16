import React from 'react';
import type { StoryFn } from '@storybook/addons';
import { Space } from './variables';

export type PaddingConfig = {
  vertical: boolean;
  horizontal: boolean;
};

export const withPadding = (
  { vertical, horizontal }: PaddingConfig = {
    vertical: true,
    horizontal: true,
  },
) => (story: StoryFn<React.ReactNode>) => (
  <div
    style={{
      padding: `${vertical ? Space * 4 : 0}px ${horizontal ? Space * 4 : 0}px`,
    }}
  >
    {story()}
  </div>
);
