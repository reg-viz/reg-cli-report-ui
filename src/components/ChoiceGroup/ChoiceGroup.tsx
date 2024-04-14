import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useMousetrap } from '../../hooks/useMousetrap';
import type { Modify } from '../../utils/types';
import * as styles from './ChoiceGroup.css';
import { ChoiceButton } from './internal/ChoiceButton';

const getValueIndex = (options: ChoiceOption[], value: string) => {
  return options.findIndex((opts) => opts.value === value);
};

export type ChoiceOption = {
  value: string;
  label: React.ReactNode;
};

export type Props = Modify<
  React.ComponentPropsWithoutRef<'ul'>,
  {
    value: string;
    options: ChoiceOption[];
    onChange: (value: string, index: number) => void;
  }
>;

export const ChoiceGroup = ({ value, options, onChange, ...rest }: Props) => {
  const rootRef = useRef<HTMLUListElement>(null);

  const changedByKey = useRef(false);
  const buttonRefList = useMemo(() => {
    return options.map(() =>
      createRef<HTMLButtonElement | HTMLAnchorElement>(),
    );
  }, [options]);

  const handleItemClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const { value: val } = e.currentTarget;

      onChange(val, getValueIndex(options, val));
    },
    [onChange, options],
  );

  useEffect(() => {
    if (!changedByKey.current) {
      return;
    }

    const index = getValueIndex(options, value);
    const ref = buttonRefList[index];
    if (ref != null && ref.current != null) {
      ref.current.focus();
    }

    changedByKey.current = false;
  }, [buttonRefList, options, value]);

  useMousetrap(
    ['right', 'l'],
    rootRef.current,
    (e) => {
      e.stopPropagation();

      const current = getValueIndex(options, value);
      const next = current + 1;
      if (next >= options.length) {
        return;
      }

      changedByKey.current = true;
      onChange(options[next].value, next);
    },
    [options, value, onChange],
  );

  useMousetrap(
    ['left', 'h'],
    rootRef.current,
    (e) => {
      e.stopPropagation();

      const current = getValueIndex(options, value);
      const previous = current - 1;
      if (previous < 0) {
        return;
      }

      changedByKey.current = true;
      onChange(options[previous].value, previous);
    },
    [options, value, onChange],
  );

  return (
    <ul {...rest} ref={rootRef} className={styles.wrapper}>
      {options.map((opts, index) => (
        <li key={opts.value}>
          <ChoiceButton
            ref={buttonRefList[index]}
            value={opts.value}
            active={opts.value === value}
            onClick={handleItemClick}
          >
            {opts.label}
          </ChoiceButton>
        </li>
      ))}
    </ul>
  );
};
