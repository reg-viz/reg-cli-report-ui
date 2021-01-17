import React from 'react';
import RcSlider from 'rc-slider';
import styled, { css } from 'styled-components';
import { Focus, Duration, Easing, Color } from '../../styles/variables';

const barStyles = css`
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -2px;
  height: 4px;
  border-radius: 2px;
`;

const StyledSlider = styled(RcSlider)`
  position: relative;
  height: 32px;
  cursor: pointer;

  & .rc-slider-rail {
    ${barStyles};
    z-index: 1;
    width: 100%;
    background: ${Color.BORDER};
  }

  & .rc-slider-track {
    ${barStyles};
    z-index: 2;
    background: ${Color.BRAND_PRIMARY};
  }

  & .rc-slider-handle {
    position: absolute;
    top: 50%;
    z-index: 3;
    margin-top: -9px;
    width: 18px;
    height: 18px;
    background: ${Color.WHITE};
    border-radius: 50%;
    border: 4px solid ${Color.BRAND_PRIMARY};
    transition-property: transform, border;
    transition-duration: ${Duration.FADE_IN}ms;
    transition-timing-function: ${Easing.STANDARD};

    &:focus {
      outline: none;
    }

    &:focus-visible {
      box-shadow: ${Focus};
    }
  }

  &:hover .rc-slider-handle,
  & .rc-slider-handle:focus-visible {
    border-width: 2px;
    transform: scale(1.15);
  }
`;

export type Props = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export const Slider: React.FC<Props> = ({ ...rest }) => (
  <StyledSlider {...rest} />
);
