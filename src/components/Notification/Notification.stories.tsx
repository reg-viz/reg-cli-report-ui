import React, { useState, useEffect } from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Notification } from './Notification';

const defaultProps = {
  show: true,
  message: 'Notification !!',
};

const Demo: React.FC = () => {
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

export default {
  title: 'Notification',
  decorators: [withPadding()],
};

export const Overview = () => <Demo />;

export const WithShow = () => <Notification {...defaultProps} />;
