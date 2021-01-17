import React from 'react';
import styled from 'styled-components';
import {
  Space,
  Shadow,
  Duration,
  Easing,
  Focus,
  Typography,
  Color,
} from '../../styles/variables';

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

const Checkbox = styled.span`
  position: relative;

  & > input {
    position: absolute;
    top: -25%;
    left: -25%;
    width: 150%;
    height: 150%;
    z-index: 2;
    margin: 0;
    padding: 0;
    opacity: 0;
    cursor: pointer;
  }

  & > span {
    position: relative;
    z-index: 1;
    display: block;
    width: 42px;
    height: 22px;
    border-radius: 11px;
    background: ${Color.BORDER};
    transition: transform ${Duration.SMALL_OUT}ms ${Easing.STANDARD};

    &::before {
      position: absolute;
      top: 1px;
      left: 1px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${Color.WHITE};
      box-shadow: ${Shadow.LEVEL1};
      transition: transform ${Duration.SMALL_OUT}ms ${Easing.STANDARD};
      content: '';
    }
  }

  & > input:checked + span {
    background: ${Color.BRAND_PRIMARY};

    &::before {
      transform: translateX(20px);
    }
  }

  & > input:focus-visible + span {
    box-shadow: ${Focus};
  }
`;

const Prepend = styled.span`
  ${Typography.SUBTITLE3};
  margin-right: ${Space * 1}px;
  text-align: right;
`;

const Append = styled.span`
  ${Typography.SUBTITLE3};
  margin-left: ${Space * 1}px;
  text-align: left;
`;

export type Props = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'id' | 'type'
> & {
  id: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
};

export const Switch: React.FC<Props> = ({ id, prepend, append, ...rest }) => {
  const prependId = `${id}-prepend`;
  const appendId = `${id}-append`;
  const describedby = [];

  if (prepend != null) {
    describedby.push(prependId);
  }

  if (append != null) {
    describedby.push(appendId);
  }

  return (
    <Wrapper>
      {prepend && <Prepend id={prependId}>{prepend}</Prepend>}
      <Checkbox>
        <input
          {...rest}
          id={id}
          type="checkbox"
          aria-describedby={describedby.join(' ')}
        />
        <span />
      </Checkbox>
      {append && <Append id={appendId}>{append}</Append>}
    </Wrapper>
  );
};
