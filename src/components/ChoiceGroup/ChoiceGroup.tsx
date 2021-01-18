import React, { createRef, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useMousetrap } from '../../hooks/useMousetrap';
import { Space, Shadow, Color, BreakPoint } from '../../styles/variables';
import { ChoiceButton } from './internal/ChoiceButton';

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
  grid-gap: ${Space * 0.5}px;
  margin: 0;
  padding: ${Space * 0.5}px;
  border-radius: 26px;
  background: ${Color.WHITE};
  box-shadow: ${Shadow.LEVEL2};
  list-style: none;

  @media (min-width: ${BreakPoint.SMALL}px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
`;

const ListItem = styled.li``;

const getValueIndex = (options: ChoiceOption[], value: string) => {
  return options.findIndex((opts) => opts.value === value);
};

export type ChoiceOption = {
  value: string;
  label: React.ReactNode;
};

export type Props = Omit<React.ComponentPropsWithoutRef<'ul'>, 'onChange'> & {
  value: string;
  options: ChoiceOption[];
  onChange: (value: string, index: number) => void;
};

export const ChoiceGroup: React.FC<Props> = ({
  value,
  options,
  onChange,
  ...rest
}) => {
  const rootRef = useRef<HTMLUListElement>(null);

  const changedByKey = useRef(false);
  const buttonRefList = useMemo(() => {
    return options.map(() =>
      createRef<HTMLButtonElement | HTMLAnchorElement>(),
    );
  }, [options]);

  const handleItemClick = React.useCallback(
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
    <List {...rest} ref={rootRef}>
      {options.map((opts, index) => (
        <ListItem key={opts.value}>
          <ChoiceButton
            ref={buttonRefList[index]}
            value={opts.value}
            active={opts.value === value}
            onClick={handleItemClick}
          >
            {opts.label}
          </ChoiceButton>
        </ListItem>
      ))}
    </List>
  );
};
