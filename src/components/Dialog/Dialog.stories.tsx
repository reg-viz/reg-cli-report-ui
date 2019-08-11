import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
import { Dialog } from './';

const defaultProps = {
  id: 'dialog',
  onRequestClose: action('onRequestClose'),
};

const Overview: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}>
        Open
      </button>

      <Dialog
        {...defaultProps}
        open={open}
        onRequestClose={() => {
          setOpen(false);
        }}>
        Content
      </Dialog>
    </>
  );
};

storiesOf('Dialog', module)
  .addDecorator(withPadding())
  .add('overview', () => <Overview />);
