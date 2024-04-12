import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { Notification } from './Notification';

type Component = typeof Notification;
type Story = StoryObj<Component>;

export default {
  component: Notification,
  args: {
    show: true,
    message: 'Notification !!',
  },
} satisfies Meta<Component>;

export const Overview: Story = {
  render: (args) => {
    const [msg, setMsg] = useState('');

    useEffect(() => {
      setTimeout(() => {
        setMsg('');
      }, 1000);
    }, [msg]);

    return (
      <>
        <button onClick={() => setMsg('Notification !!')}>notify</button>
        <Notification {...args} show={msg !== ''} message={msg} />
      </>
    );
  },
};

export const WithShow: Story = {};
