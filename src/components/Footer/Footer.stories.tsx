import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './';

type Component = typeof Footer;
type Story = StoryObj<Component>;

export default {
  component: Footer,
} satisfies Meta<Component>;

export const Overview: Story = {};
