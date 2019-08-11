import { createContainer } from 'unstated-next';
import { useState, useEffect } from 'react';

const TIMEOUT = 5000;

export type NotificationValue = {
  show: boolean;
  message: string;
  notify: (msg: string) => void;
};

export const NotificationContainer = createContainer<NotificationValue>(() => {
  const [message, setMessage] = useState('');

  const notify = (msg: string) => setMessage(msg);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, TIMEOUT);

    return () => clearTimeout(timer);
  }, [message]);

  return {
    show: message !== '',
    message,
    notify,
  };
});
