/**
 * Focusable Elements - Browser Compatibility Table https://allyjs.io/data-tables/focusable.html
 */
const FOCUSABLE_SELECTOR = [
  ...['button', 'keygen', 'select', 'textarea'].map((s) => `${s}:not(:disabled)`),
  'input:not(:disabled):not([type="hidden"]):not([type="file"])',
  'details > summary',
  'a[href]:not([rel="ignore"])',
  'area[href]',
  '[tabindex]:not([disabled]):not([tabindex=""])',
  '[contenteditable]',
  'iframe',
  'audio',
  'video',
].join(',');

export function tryFocus(element: HTMLElement | null): void {
  if (element == null) {
    return;
  }

  element.focus();

  if (document.activeElement !== element) {
    element.setAttribute('tabindex', '0');
    element.focus();
  }
}

export function findFocusable(element: HTMLElement): HTMLElement[] {
  const { childNodes } = element;
  let nodes: HTMLElement[] = [];

  for (let i = 0; i < childNodes.length; i += 1) {
    const node = childNodes[i];

    if (!(node instanceof HTMLElement)) {
      continue;
    }

    if (node.matches(FOCUSABLE_SELECTOR)) {
      nodes.push(node);
    } else {
      nodes = [...nodes, ...findFocusable(node)];
    }
  }

  return nodes;
}

export function findFirstFocusable(element: HTMLElement): HTMLElement | null {
  const { childNodes } = element;

  for (let i = 0; i < childNodes.length; i += 1) {
    const node = childNodes[i];

    if (!(node instanceof HTMLElement)) {
      continue;
    }

    if (node.matches(FOCUSABLE_SELECTOR)) {
      return node;
    }

    const found = findFirstFocusable(node);
    if (found != null) {
      return found;
    }
  }

  return null;
}

export function findLastFocusable(element: HTMLElement): HTMLElement | null {
  const { childNodes } = element;

  for (let i = childNodes.length - 1; i >= 0; i -= 1) {
    const node = childNodes[i];

    if (!(node instanceof HTMLElement)) {
      continue;
    }

    if (node.matches(FOCUSABLE_SELECTOR)) {
      return node;
    }

    const found = findLastFocusable(node);
    if (found != null) {
      return found;
    }
  }

  return null;
}
