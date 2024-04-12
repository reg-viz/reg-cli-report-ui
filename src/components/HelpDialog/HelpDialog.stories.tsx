import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { HelpDialog } from './';

type Component = typeof HelpDialog;
type Story = StoryObj<Component>;

export default {
  component: HelpDialog,
  args: {
    open: true,
    onRequestClose: action('onRequestClose'),
  },
} satisfies Meta<Component>;

export const Overview: Story = {};
