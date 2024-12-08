import React, { useCallback, useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import { Duration } from '../../../../styles/variables.css';
import { typography } from '../../../../styles/variables.css';
import type { Matching, RegEntity } from '../../../../types/reg';
import { ChoiceGroup } from '../../../ChoiceGroup';
import { Image } from '../../../Image';
import { Slider } from '../../../Slider';
import { Switch } from '../../../Switch';
import { Blend } from './Blend';
import * as styles from './ComparisonView.css';
import { Diff } from './Diff';
import { Slide } from './Slide';
import { Toggle } from './Toggle';
import { TwoUp } from './TwoUp';

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

export const ComparisonView = ({
  scrollerRef,
  entity,
  matching,
  defaultMode,
}: Props) => {
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
    <div className={styles.wrapper}>
      <div className={styles.comparisonImage} ref={scrollerRef}>
        <div className={styles.comparisonImageInnerV}>
          <div className={styles.comparisonImageInnerH}>
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
          </div>
        </div>
      </div>

      {entity.variant === 'changed' && (
        <div className={styles.comparisonMode}>
          <SwitchTransition>
            <CSSTransition
              key={mode}
              classNames="control"
              timeout={{
                enter: Duration.FADE_IN,
                exit: Duration.FADE_OUT,
              }}
            >
              <div className={styles.controlWrapper}>
                {mode === 'slide' && (
                  <div className={styles.control}>
                    <span className={typography.subTitle3}>Before</span>
                    <span className={styles.controlSlider}>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={slideValue}
                        onChange={handleSlideChange}
                        reverse={true}
                      />
                    </span>
                    <span className={typography.subTitle3}>After</span>
                  </div>
                )}

                {mode === 'blend' && (
                  <div className={styles.control}>
                    <span>Before</span>
                    <span className={styles.controlSlider}>
                      <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={blendValue}
                        onChange={handleBlendChange}
                      />
                    </span>
                    <span>After</span>
                  </div>
                )}

                {mode === 'toggle' && (
                  <div className={styles.control}>
                    <Switch
                      id="toggle-switch"
                      prepend="Before"
                      append="After"
                      checked={toggleValue}
                      onChange={handleToggleChange}
                    />
                  </div>
                )}
              </div>
            </CSSTransition>
          </SwitchTransition>

          <ChoiceGroup
            options={modes}
            value={mode}
            onChange={handleModeChange}
          />
        </div>
      )}
    </div>
  );
};

ComparisonView.defaultProps = {
  defaultMode: 'slide',
};
