import React from 'react';
import type { AnchorScrollContextValue } from '../../context/AnchorScrollContext';
import { AnchorScrollContext } from '../../context/AnchorScrollContext';

type GridStyleProperty = {
  gap: number;
  minContentLength?: number;
};

type GridStyle = {
  gap: number;
  gridTemplateColumns: string;
  padding: 0;
  margin: 0;
  listStyle: 'none';
  display: 'grid';
  position: 'absolute';
  left: 0;
  right: 0;
};

type SK<T, K extends keyof T> = T[K] extends string ? K : never;

type Props<T, K extends keyof T> = {
  items: T[];
  itemKey: SK<T, K>;
  children: (props: { item: T; index: number }) => JSX.Element;
  gridOptions: GridStyleProperty | ({ media: string } & GridStyleProperty)[];
  cellHeight: number;
};

type State = {
  isIntersecting: boolean;
  containerHeight: number;
  repeatLength: number;
  gridStyle: GridStyle;
  offsetIndex: number; // The first index of the cell displayed in viewport
  visibleItemsLength: number; // The number of cells to render
};

const createGridStyleObject = (opt: GridStyleProperty) => {
  return {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'grid',
    position: 'absolute',
    left: 0,
    right: 0,
    gap: opt.gap,
    gridTemplateColumns: opt.minContentLength
      ? `repeat(auto-fill, minmax(${opt.minContentLength}px, 1fr))`
      : 'repeat(1, 1fr)',
  } as const;
};

const prerenderRowsLength = 1;

export class VGrid<T, K extends keyof T> extends React.Component<
  Props<T, K>,
  State
> {
  static contextType = AnchorScrollContext;

  context!: AnchorScrollContextValue;
  containerRef = React.createRef<HTMLDivElement>();
  intersectionObserver?: IntersectionObserver;
  resizeObserver?: ResizeObserver;
  gridProperties: { media: MediaQueryList; prop: GridStyleProperty }[];
  previousContainerWidth?: number;

  state: State = {
    isIntersecting: false,
    offsetIndex: 0,
    repeatLength: 1,
    gridStyle: {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: 'grid',
      position: 'absolute',
      left: 0,
      right: 0,
      gap: -1,
      gridTemplateColumns: '',
    },
    containerHeight: 0,
    visibleItemsLength: 20,
  };

  constructor(props: Props<T, K>) {
    super(props);

    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleOnHashChange = this.handleOnHashChange.bind(this);

    // Create pseudo CSS obj to emulate the media query such as:
    //
    // ```css
    // @media screen and (min-width: 320px) {
    //   ...
    // }
    // ```
    // The created pair MediaQueryList instance will be used to determine grid style properties
    //
    if (!Array.isArray(props.gridOptions)) {
      this.gridProperties = [
        {
          media: matchMedia('all'),
          prop: props.gridOptions,
        },
      ];
    } else {
      this.gridProperties = props.gridOptions
        .slice()
        .reverse()
        .map(({ media, ...rest }) => ({
          media: matchMedia(media),
          prop: rest,
        }));
    }
  }

  componentDidMount() {
    const containerElement = this.containerRef.current;
    if (!containerElement) return;

    // Using IntersectionObserver to prevent scrolling calculation when the entire container is out of viewport.
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries.length !== 1) return;
        const entry = entries[0];
        const { isIntersecting } = entry;
        if (this.state.isIntersecting !== isIntersecting) {
          this.setState({ isIntersecting });
        }
      },
      {
        threshold: 0,
      },
    );
    this.intersectionObserver.observe(containerElement);

    // Using ResizeObserver because we should update some grid properties(e.g. the num of cells per 1 row) when the container element is resized.
    this.resizeObserver = new ResizeObserver((entries) => {
      if (entries.length !== 1) return;
      const entry = entries[0];
      const {
        contentRect: { width },
      } = entry;
      if (this.previousContainerWidth !== width) {
        this.updateContainerState(width);
      }
      this.previousContainerWidth = width;
    });
    this.resizeObserver.observe(containerElement);

    document.addEventListener('scroll', this.handleOnScroll, { passive: true });

    // Listen to URL hash and update scrolling position if it's changed.
    window.addEventListener('hashchange', this.handleOnHashChange);

    this.previousContainerWidth = containerElement.clientWidth;

    // Initialize grid information
    this.updateContainerState(containerElement.clientWidth);

    // For direct landing using URL with hash
    if (!this.context.consumed) {
      const hit = this.findOffsetIndexFromHash(this.context.hash);
      if (hit) {
        // Notify scrolling to the context because we should not check the hash after the scrolling.
        this.context.consume();
        setTimeout(() => this.scrollTo(hit.offsetIndex));
      }
    }
  }

  componentDidUpdate(prevProps: Props<T, K>) {
    if (!this.containerRef.current) return;
    if (
      this.props.items.length !== prevProps.items.length ||
      this.props.cellHeight !== prevProps.cellHeight
    ) {
      this.updateContainerState(this.containerRef.current.clientWidth);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleOnScroll);
    window.removeEventListener('hashchange', this.handleOnHashChange);
    this.intersectionObserver && this.intersectionObserver.disconnect();
    this.resizeObserver && this.resizeObserver.disconnect();
  }

  private get scrollingElement() {
    return document.scrollingElement as HTMLElement;
  }

  private get rowHeightUnit() {
    const { cellHeight } = this.props;
    const {
      gridStyle: { gap },
    } = this.state;
    return cellHeight + gap;
  }

  // This function should be invoked when the container element is resized.
  private updateContainerState(containerWidth: number) {
    const { cellHeight } = this.props;
    const { gridStyle, repeatLength } = this.getGridDefinition(containerWidth);
    const rowHeight = cellHeight + gridStyle.gap;
    const allItemsCount = this.props.items.length;
    const containerHeight =
      Math.ceil(allItemsCount / repeatLength) * rowHeight - gridStyle.gap;
    const visibleItemsLength =
      (~~(innerHeight / (this.props.cellHeight + gridStyle.gap)) +
        2 +
        prerenderRowsLength) *
      repeatLength;
    this.setState({
      containerHeight,
      repeatLength,
      visibleItemsLength,
      gridStyle,
    });

    requestAnimationFrame(() => this.updateCurrentOffsetIndex());
  }

  private getGridDefinition(containerWidth: number) {
    let matched: GridStyleProperty | undefined;
    this.gridProperties.some(({ media, prop }) => {
      matched = prop;
      return media.matches;
    });
    if (!matched) throw new Error('No matched media');

    const { gap, minContentLength } = matched;
    const repeatLength =
      (minContentLength &&
        ~~((containerWidth + gap) / (minContentLength + gap))) ||
      1;

    const gridStyle = createGridStyleObject(matched);

    return { gridStyle, repeatLength, gap };
  }

  private findOffsetIndexFromHash(hash: string) {
    const { itemKey } = this.props;
    const targetName = hash.slice(1);
    const foundIndex = this.props.items.findIndex((item) => {
      const key = item[itemKey] as unknown as string;
      return key === targetName;
    });
    if (foundIndex === -1) return;
    return {
      offsetIndex: foundIndex,
    };
  }

  private handleOnHashChange({ newURL }: HashChangeEvent) {
    const { hash } = new URL(newURL);
    const hit = this.findOffsetIndexFromHash(hash);
    if (!hit) return;
    this.scrollTo(hit.offsetIndex);
  }

  private handleOnScroll() {
    if (!this.state.isIntersecting) return;
    this.updateCurrentOffsetIndex();
  }

  private scrollTo(offsetIndex: number) {
    const top = this.calculateClientOffsetTop(offsetIndex);
    const threshold = this.state.visibleItemsLength * this.rowHeightUnit * 1;
    const rafCb = () => {
      if (Math.abs(top - scrollY) <= threshold) {
        this.updateCurrentOffsetIndex();
        return;
      }
      requestAnimationFrame(rafCb);
    };
    requestAnimationFrame(rafCb);
    scroll({ top });
  }

  private updateCurrentOffsetIndex() {
    const containerElement = this.containerRef.current;
    if (!containerElement) return;
    const cot = containerElement.offsetTop;
    const sst = this.scrollingElement.scrollTop;
    const deltaY = sst - cot;
    const nextOffsetIndex =
      ~~(deltaY / this.rowHeightUnit) * this.state.repeatLength;
    if (nextOffsetIndex >= 0 && this.state.offsetIndex !== nextOffsetIndex) {
      this.setState({ offsetIndex: nextOffsetIndex });
    }
  }

  private sliceVisibleItems() {
    const { offsetIndex, visibleItemsLength } = this.state;
    return this.props.items.slice(
      offsetIndex,
      visibleItemsLength + offsetIndex,
    );
  }

  private calculateInnerOffsetTop(offsetIndex: number) {
    const { repeatLength } = this.state;
    return ~~(offsetIndex / repeatLength) * this.rowHeightUnit;
  }

  private calculateClientOffsetTop(offsetIndex: number) {
    if (!this.containerRef.current) return 0;
    return (
      this.calculateInnerOffsetTop(offsetIndex) +
      this.containerRef.current.offsetTop
    );
  }

  render() {
    const { children, itemKey, cellHeight } = this.props;
    const { containerHeight } = this.state;
    const offsetTop = this.calculateInnerOffsetTop(this.state.offsetIndex);
    const containerStyle = {
      position: 'relative',
      height: containerHeight,
    } as const;
    const innerStyle = {
      ...this.state.gridStyle,
      top: offsetTop,
    };
    return (
      <div ref={this.containerRef} style={containerStyle}>
        <ul style={innerStyle}>
          {this.sliceVisibleItems().map((item, index) => (
            <li
              key={item[itemKey] as unknown as string}
              style={{ height: cellHeight }}
            >
              {children({ item, index })}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
