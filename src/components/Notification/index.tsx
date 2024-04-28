import React from 'react';
import { useNotificationMessage } from '../../states/notification';
import { Notification as Component } from './Notification';

export type Props = {};

export const Notification = () => {
  const message = useNotificationMessage();

  return <Component show={message != null} message={message ?? ''} />;
};
