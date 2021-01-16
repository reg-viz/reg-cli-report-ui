import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { withPadding } from '../../../../styles/storybook-decorators';
import { Toggle } from './';

const defaultProps = {
  onClick: action('onClick') as any,
};

const Overview: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Toggle {...defaultProps} open={open} onClick={() => setOpen(!open)} />
  );
};

storiesOf('Toggle', module)
  .addDecorator(withPadding())
  .add('overview', () => <Overview />)
  .add('with open', () => <Toggle {...defaultProps} open={true} />)
  .add('with close', () => <Toggle {...defaultProps} open={false} />);
