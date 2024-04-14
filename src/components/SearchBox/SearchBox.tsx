import React from 'react';
import { Color } from '../../styles/variables.css';
import { SearchIcon } from '../icons/SearchIcon';
import * as styles from './SearchBox.css';

export type Props = React.ComponentPropsWithoutRef<'input'> & {
  inputRef?: React.Ref<HTMLInputElement>;
};

export const SearchBox = ({ inputRef, children, ...rest }: Props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">
        <SearchIcon fill={Color.TEXT_SUB} />
      </span>
      <input className={styles.input} ref={inputRef} type="text" {...rest} />
    </div>
  );
};
