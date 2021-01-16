import React from 'react';
import styled from 'styled-components';
import { Color } from '../../styles/variables';
import { SignNewIcon } from '../icons/SignNewIcon';
import { SignPassedIcon } from '../icons/SignPassedIcon';
import { SignChangedIcon } from '../icons/SignChangedIcon';
import type { RegVariant } from '../../types/reg';
import { SignDeletedIcon } from '../icons/SignDeletedIcon';

const signIconMap = {
  passed: {
    color: Color.SIGN_PASSED,
    label: 'Passed item',
    icon: <SignPassedIcon width={18} height={18} fill="#fff" />,
  },
  new: {
    color: Color.SIGN_NEW,
    label: 'New item',
    icon: <SignNewIcon width={18} height={18} fill="#fff" />,
  },
  changed: {
    color: Color.SIGN_CHANGED,
    label: 'Changed item',
    icon: <SignChangedIcon width={18} height={18} fill="#fff" />,
  },
  deleted: {
    color: Color.SIGN_DELETED,
    label: 'Deleted item',
    icon: <SignDeletedIcon width={18} height={18} fill="#fff" />,
  },
};

const Wrapper = styled('span')<{ color: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: ${({ color }) => color};
  border-radius: 50%;
  line-height: 0;
  vertical-align: bottom;
`;

export type Props = {
  variant: RegVariant;
};

export const Sign: React.FC<Props> = ({ variant, ...rest }) => {
  const { color, label, icon } = signIconMap[variant];

  return (
    <Wrapper {...rest} aria-label={label} color={color}>
      {icon}
    </Wrapper>
  );
};
