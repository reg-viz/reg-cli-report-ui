import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CloseIcon } from '../icons/CloseIcon';
import { HelpIcon } from '../icons/HelpIcon';
import { MoreIcon } from '../icons/MoreIcon';
import { Color } from '../../styles/variables.css';
import { IconButton } from './';

type Component = typeof IconButton;
type Story = StoryObj<Component>;

export default {
  component: IconButton,
} satisfies Meta<Component>;

export const Overview: Story = {
  render: () => (
    <>
      <IconButton>
        <MoreIcon fill={Color.TEXT_SUB} />
      </IconButton>

      <IconButton>
        <CloseIcon fill={Color.BRAND_PRIMARY} />
      </IconButton>

      <IconButton variant="dark">
        <HelpIcon fill={Color.TEXT_SUB} />
      </IconButton>
    </>
  ),
};
