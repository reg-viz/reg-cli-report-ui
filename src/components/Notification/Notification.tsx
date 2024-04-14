import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import { Snackbar } from '../Snackbar';
import { Portal } from '../internal/Portal';
import { Duration } from '../../styles/variables.css';
import * as styles from './Notification.css';

export type Props = {
  show: boolean;
  message: string;
};

export const Notification = ({ show, message }: Props) => {
  return (
    <Portal>
      <div className={styles.wrapper}>
        <div role="alert" alia-live="assertive">
          <SwitchTransition>
            <CSSTransition
              key={show ? 'show' : 'hide'}
              classNames="notification"
              timeout={{
                enter: Duration.FADE_IN,
                exit: Duration.FADE_OUT,
              }}
            >
              <div className={styles.inner}>
                {show && <Snackbar>{message}</Snackbar>}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </Portal>
  );
};
