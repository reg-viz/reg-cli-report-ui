import React from 'react';
import styled from 'styled-components';
import CSSTransition from 'react-transition-group/CSSTransition';
import { Easing } from '../../../styles/variables';

const Wrapper = styled('div')<{ duration: { enter: number; exit: number } }>`
  transition-property: height;
  transition-timing-function: ${Easing.STANDARD};

  &[aria-hidden='true']:not(.collapse-exit) {
    display: none;
  }

  &.collapse-enter {
    overflow: hidden;
    height: 0;
    transition-duration: ${({ duration }) => duration.enter}ms;
  }

  &.collapse-exit {
    overflow: auto;
    height: auto;
    transition-duration: ${({ duration }) => duration.exit}ms;
  }

  &.collapse-exit-active {
    height: 0;
    overflow: hidden;
  }

  & > div {
    display: flex;
  }

  & > div > div {
    flex-basis: 100%;
    width: 100%;
  }
`;

export type Props = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'aria-hidden'
> & {
  open: boolean;
  duration: { enter: number; exit: number };
};

export class Collapse extends React.Component<Props> {
  private bodyRef = React.createRef<HTMLDivElement>();

  public render(): React.ReactNode {
    const { open, duration, children, ...rest } = this.props;

    return (
      <CSSTransition
        classNames="collapse"
        in={open}
        timeout={duration}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
      >
        <Wrapper
          {...rest}
          duration={duration}
          aria-hidden={open ? 'false' : 'true'}
        >
          <div ref={this.bodyRef}>
            <div>{children}</div>
          </div>
        </Wrapper>
      </CSSTransition>
    );
  }

  private handleEnter = (node: HTMLElement) => {
    this.applyPreAnimationStyles(node);
  };

  private handleEntered = (node: HTMLElement) => {
    this.clearInlineStyles(node);
  };

  private handleExit = (node: HTMLElement) => {
    this.applyPreAnimationStyles(node);
  };

  private handleExiting = (node: HTMLElement) => {
    this.clearInlineStyles(node);
  };

  private applyPreAnimationStyles(node: HTMLElement) {
    const { current: body } = this.bodyRef;

    node.style.height = `${body != null ? body.clientHeight : 0}px`;
    node.style.overflow = 'hidden';
  }

  private clearInlineStyles(node: HTMLElement) {
    node.style.height = '';
    node.style.overflow = '';
  }
}
