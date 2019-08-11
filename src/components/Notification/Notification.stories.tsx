import { storiesOf } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Notification } from './Notification';

const defaultProps = {
  show: true,
  message: 'Notification !!',
};

const Overview: React.FC = () => {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setMsg('');
    }, 1000);
  }, [msg]);

  return (
    <>
      <button onClick={() => setMsg('Notification !!')}>notify</button>
      <Notification {...defaultProps} show={msg !== ''} message={msg} />
    </>
  );
};

storiesOf('Notification', module)
  .addDecorator(withPadding())
  .add('overview', () => <Overview />)
  .add('with show', () => <Notification {...defaultProps} />);
