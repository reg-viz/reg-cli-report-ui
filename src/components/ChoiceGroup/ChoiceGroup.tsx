import React from 'react';
import styled from 'styled-components';
import { Space, Shadow } from '../../styles/variables';
import { ChoiceButton } from './internal/ChoiceButton';

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: ${Space * 0.5}px;
  border-radius: 52px;
  background: #fff;
  box-shadow: ${Shadow.LEVEL1};
  list-style: none;
`;

const ListItem = styled.li`
  flex: 1 1 auto;
  margin-left: ${Space * 0.5}px;

  &:first-child {
    margin-left: 0;
  }
`;

export type ChoiceOption = {
  value: string;
  label: React.ReactNode;
};

export type Props = Omit<React.ComponentPropsWithoutRef<'ul'>, 'onChange'> & {
  value: string;
  options: ChoiceOption[];
  onChange: (value: string, index: number) => void;
};

export const ChoiceGroup: React.FC<Props> = ({ value, options, onChange, ...rest }) => {
  const handleItemClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const { value: val } = e.currentTarget;
      const activeIndex = options.findIndex((opts) => opts.value === val);

      onChange(val, activeIndex);
    },
    [onChange, options],
  );

  return (
    <List {...rest}>
      {options.map((opts) => (
        <ListItem key={opts.value}>
          <ChoiceButton value={opts.value} active={opts.value === value} onClick={handleItemClick}>
            {opts.label}
          </ChoiceButton>
        </ListItem>
      ))}
    </List>
  );
};
