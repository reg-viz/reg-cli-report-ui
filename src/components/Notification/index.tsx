import React from 'react';
import { NotificationContainer } from '../../containers/notification/NotificationContainer';
import { Notification as Component } from './Notification';

export type Props = {};

export const Notification: React.FC<Props> = () => {
  const notification = NotificationContainer.useContainer();

  return <Component show={notification.show} message={notification.message} />;
};
