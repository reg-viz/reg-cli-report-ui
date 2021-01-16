import React from 'react';
import styled from 'styled-components';
import {
  Space,
  Duration,
  Easing,
  Typography,
  Color,
} from '../../styles/variables';
import { BaseButton } from '../internal/BaseButton';
import { Collapse } from '../internal/Collapse';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { Ellipsis } from '../internal/Ellipsis';

const Button = styled(BaseButton)<{ large: boolean; depth: number }>`
  ${({ large }) => (large ? Typography.SUBTITLE2 : Typography.SUBTITLE3)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  padding-left: ${({ depth }) => Space * 2 + Space * 2 * depth}px;
  padding-right: ${Space * 2}px;
  background: transparent;
  border: 0;
  color: ${Color.TEXT_BASE};
  text-align: left;

  &:hover {
    background-color: ${Color.HOVER_BLACK};
  }
`;

const ArrowIcon = styled('span')<{ open: boolean }>`
  margin-right: ${Space}px;
  line-height: 0;
  transition: transform ${Duration.SMALL_IN}ms ${Easing.STANDARD};
  transform: rotate(${({ open }) => (open ? '0deg' : '-180deg')});
`;

const Label = styled.span`
  display: block;
  flex: 1 1 auto;
  overflow: hidden;
`;

const Meta = styled.span`
  ${Typography.SUBHEAD};
  margin-left: ${Space}px;
  color: ${Color.TEXT_SUB};
  white-space: nowrap;
`;

const Icon = styled.span`
  margin-left: ${Space}px;
  line-height: 0;
`;

const InnerList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export type Props = {
  large?: boolean;
  depth?: number;
  open?: boolean;
  defaultOpen?: boolean;
  label: React.ReactNode;
  meta?: React.ReactNode;
  icon?: React.ReactNode;
  onChange?: (open: boolean) => void;
};

type State = {
  open: boolean;
};

export class Expandable extends React.Component<Props, State> {
  public static defaultProps = {
    large: false,
    depth: 0,
  };

  public state = {
    open: this.props.defaultOpen === true,
  };

  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.open != null && nextProps.open !== prevState.open) {
      return { open: nextProps.open };
    }

    return null;
  }

  public render() {
    const { large, depth, label, meta, icon, children } = this.props;
    const { open } = this.state;

    return (
      <li>
        <Button
          large={large as boolean}
          depth={depth as number}
          onClick={this.handleClick}
        >
          <ArrowIcon open={open}>
            <ArrowUpIcon fill={Color.TEXT_SUB} />
          </ArrowIcon>
          <Label>
            <Ellipsis>{label}</Ellipsis>
          </Label>
          {meta && <Meta>{meta}</Meta>}
          {icon && <Icon>{icon}</Icon>}
        </Button>
        <Collapse
          open={open}
          duration={{ enter: Duration.SLIDE_IN, exit: Duration.SLIDE_OUT }}
        >
          <InnerList>{children}</InnerList>
        </Collapse>
      </li>
    );
  }

  private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (this.props.open == null) {
      this.setState({ open: !this.state.open });
    }

    if (this.props.onChange != null) {
      this.props.onChange(!this.props.open);
    }
  };
}
