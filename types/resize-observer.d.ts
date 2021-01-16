type ResizeObserverEntry = {
  target: Element;
  contentRect: DOMRectReadOnly;
  borderBoxSize: {
    readonly inlineSize: number;
    readonly blockSize: number;
  };
  contentBoxSize: {
    readonly inlineSize: number;
    readonly blockSize: number;
  };
};

type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void;

// For now TypeScript dom.d.ts does not export ResizeObserver definition, so we should self-define.
// But this definition should be removed when ts esports right one.
declare class ResizeObserver {
  constructor(cb: ResizeObserverCallback);
  observe(targetElement: HTMLElement): void;
  disconnect(): void;
}
