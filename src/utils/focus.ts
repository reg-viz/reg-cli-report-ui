import { findFocusable } from './selector';

export const tryFocus = (element: HTMLElement | null): boolean => {
  if (element == null) {
    return false;
  }

  element.focus();

  if (document.activeElement !== element) {
    element.setAttribute('tabindex', '0');
    element.focus();
  }

  return document.activeElement === element;
};

const trySiblingsFocus = (
  element: HTMLElement | null,
  callback: (focusable: HTMLElement[], index: number) => boolean,
): boolean => {
  if (element == null) {
    return false;
  }

  const focusable = findFocusable(element);
  if (focusable.length < 1) {
    return false;
  }

  const index = focusable.findIndex((el) => el === document.activeElement);
  if (index < 0) {
    return tryFocus(focusable[index]);
  }

  return callback(focusable, index);
};

export const tryNextFocus = (element: HTMLElement | null): boolean =>
  trySiblingsFocus(element, (focusable, index) =>
    focusable.splice(index + 1).some(tryFocus),
  );

export const tryPreviousFocus = (element: HTMLElement | null): boolean =>
  trySiblingsFocus(element, (focusable, index) =>
    focusable.splice(0, index).reverse().some(tryFocus),
  );
