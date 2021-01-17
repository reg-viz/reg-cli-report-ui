import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { withPadding } from '../../../../styles/storybook-decorators';
import { Toggle } from './';

const defaultProps = {
  onClick: action('onClick') as any,
};

const Demo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Toggle {...defaultProps} open={open} onClick={() => setOpen(!open)} />
  );
};

export default {
  title: 'Toggle',
  decorators: [withPadding()],
};

export const Overview = () => <Demo />;

export const WithOpen = () => <Toggle {...defaultProps} open={true} />;

export const WithClose = () => <Toggle {...defaultProps} open={false} />;
