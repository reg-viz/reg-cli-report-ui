import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const TIMEOUT = 5000;

const notificationAtom = atom<
  | {
      id: null;
      message: null;
    }
  | {
      id: number;
      message: string;
    }
>({
  id: null,
  message: null,
});

const derivedNotificationAtom = atom<string | null, [string], void>(
  (get) => get(notificationAtom).message,
  (get, set, message) => {
    const previous = get(notificationAtom);
    if (previous.id != null) {
      window.clearInterval(previous.id);
    }
    set(notificationAtom, {
      id: window.setTimeout(() => {
        set(notificationAtom, { id: null, message: null });
      }, TIMEOUT),
      message,
    });
  },
);

export const useNotify = () => {
  const [, setNotification] = useAtom(derivedNotificationAtom);

  return useCallback(
    (msg: string) => {
      setNotification(msg);
    },
    [setNotification],
  );
};

export const useNotificationMessage = () => {
  const [message] = useAtom(derivedNotificationAtom);
  return message;
};
