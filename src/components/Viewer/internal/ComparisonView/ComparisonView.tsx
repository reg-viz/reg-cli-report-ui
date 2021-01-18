import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import {
  Space,
  Shadow,
  Duration,
  Easing,
  BreakPoint,
  Typography,
  Color,
} from '../../../../styles/variables';
import { ChoiceGroup } from '../../../ChoiceGroup';
import { Slider } from '../../../Slider';
import { Switch } from '../../../Switch';
import type { RegEntity, Matching } from '../../../../types/reg';
import { Image } from '../../../Image';
import { OPEN_DELAY } from '../../constants';
import { Diff } from './Diff';
import { TwoUp } from './TwoUp';
import { Blend } from './Blend';
import { Slide } from './Slide';
import { Toggle } from './Toggle';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
`;

const ComparisonImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const ComparisonImageInnerV = styled.div`
  margin: auto ${Space * 1}px;
  width: 100%;

  @media (min-width: ${BreakPoint.MEDIUM}px) {
    margin-right: ${Space * 5}px;
    margin-left: ${Space * 5}px;
  }
`;

const ComparisonImageInnerH = styled.div`
  position: relative;
  margin: ${Space * 3}px auto ${Space * 17}px;
`;

const ComparisonMode = styled.div`
  position: absolute;
  bottom: ${Space * 1}px;
  left: 50%;
  z-index: 10;
  max-width: 100%;
  width: 480px;
  padding: 0 ${Space * 1}px;
  transform: translate(-50%, 0);
  transition-property: opacity, transform;
  transition-timing-function: ${Easing.STANDARD};

  .viewer-enter & {
    opacity: 0;
    transform: translate(-50%, 20px);
    transition-duration: ${Duration.LARGE_IN}ms;
    transition-delay: ${OPEN_DELAY}ms;
  }

  .viewer-enter-active & {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  @media (min-width: ${BreakPoint.MEDIUM}px) {
    bottom: ${Space * 5}px;
  }
`;

const ControlWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 100%;
  left: 0;
  padding: 0 ${Space * 1}px ${Space * 2}px;
`;

const Control = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: ${Space * 1}px ${Space * 4}px;
  border-radius: 20px;
  background: ${Color.WHITE};
  box-shadow: ${Shadow.LEVEL2};
  transition-property: opacity, transform;
  transition-timing-function: ${Easing.STANDARD};

  .control-enter & {
    opacity: 0;
    transform: translateY(3px);
  }

  .control-enter-active & {
    opacity: 1;
    transform: translateY(0);
    transition-duration: ${Duration.FADE_IN}ms;
  }

  .control-exit & {
    opacity: 1;
    transform: translateY(0);
  }

  .control-exit-active & {
    opacity: 0;
    transform: translateY(3px);
    transition-duration: ${Duration.FADE_OUT}ms;
  }

  & > span:first-child,
  & > span:last-child {
    ${Typography.SUBTITLE3};
  }
`;

const ControlSlider = styled.span`
  flex: 1 0 auto;
  padding: 0 ${Space * 2}px;
`;

const modes = [
  {
    value: 'diff',
    label: 'Diff',
  },
  {
    value: 'slide',
    label: 'Slide',
  },
  {
    value: '2up',
    label: '2up',
  },
  {
    value: 'blend',
    label: 'Blend',
  },
  {
    value: 'toggle',
    label: 'Toggle',
  },
];

export type Props = {
  scrollerRef?: React.Ref<HTMLDivElement>;
  entity: RegEntity;
  matching: Matching | null;
  defaultMode?: string;
};

export const ComparisonView: React.FC<Props> = ({
  scrollerRef,
  entity,
  matching,
  defaultMode,
}) => {
  const [mode, setMode] = useState(defaultMode!);
  const [slideValue, setSlideValue] = useState(50);
  const [blendValue, setBlendValue] = useState(0.5);
  const [toggleValue, setToggleValue] = useState(false);

  const handleSlideChange = useCallback((value: number) => {
    setSlideValue(value);
  }, []);

  const handleBlendChange = useCallback((value: number) => {
    setBlendValue(value);
  }, []);

  const handleToggleChange = useCallback(() => {
    setToggleValue(!toggleValue);
  }, [toggleValue]);

  const handleModeChange = useCallback((value: string) => {
    setMode(value);
  }, []);

  return (
    <Wrapper>
      <ComparisonImage ref={scrollerRef}>
        <ComparisonImageInnerV>
          <ComparisonImageInnerH>
            {entity.variant === 'changed' && (
              <>
                {mode === 'diff' && <Diff src={entity.diff} />}
                {mode === 'slide' && (
                  <Slide
                    before={entity.before}
                    after={entity.after}
                    value={slideValue}
                    matching={matching}
                    onChange={handleSlideChange}
                  />
                )}
                {mode === '2up' && (
                  <TwoUp
                    before={entity.before}
                    after={entity.after}
                    matching={matching}
                  />
                )}
                {mode === 'blend' && (
                  <Blend
                    before={entity.before}
                    after={entity.after}
                    value={blendValue}
                    matching={matching}
                  />
                )}
                {mode === 'toggle' && (
                  <Toggle
                    before={entity.before}
                    after={entity.after}
                    checked={toggleValue}
                    matching={matching}
                  />
                )}
              </>
            )}

            {(entity.variant === 'new' || entity.variant === 'passed') && (
              <Image src={entity.after} />
            )}

            {entity.variant === 'deleted' && <Image src={entity.before} />}
          </ComparisonImageInnerH>
        </ComparisonImageInnerV>
      </ComparisonImage>

      {entity.variant === 'changed' && (
        <ComparisonMode>
          <SwitchTransition>
            <CSSTransition
              key={mode}
              classNames="control"
              timeout={{
                enter: Duration.FADE_IN,
                exit: Duration.FADE_OUT,
              }}
            >
              <ControlWrapper>
                {mode === 'slide' && (
                  <Control>
                    <span>Before</span>
                    <ControlSlider>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={slideValue}
                        onChange={handleSlideChange}
                      />
                    </ControlSlider>
                    <span>After</span>
                  </Control>
                )}

                {mode === 'blend' && (
                  <Control>
                    <span>Before</span>
                    <ControlSlider>
                      <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={blendValue}
                        onChange={handleBlendChange}
                      />
                    </ControlSlider>
                    <span>After</span>
                  </Control>
                )}

                {mode === 'toggle' && (
                  <Control>
                    <Switch
                      id="toggle-switch"
                      prepend="Before"
                      append="After"
                      checked={toggleValue}
                      onChange={handleToggleChange}
                    />
                  </Control>
                )}
              </ControlWrapper>
            </CSSTransition>
          </SwitchTransition>

          <ChoiceGroup
            options={modes}
            value={mode}
            onChange={handleModeChange}
          />
        </ComparisonMode>
      )}
    </Wrapper>
  );
};

ComparisonView.defaultProps = {
  defaultMode: 'slide',
};
