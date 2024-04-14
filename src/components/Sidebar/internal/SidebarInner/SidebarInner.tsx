import React, { createRef, useCallback } from 'react';
import { EntityContainer } from '../../../../containers/entity/EntityContainer';
import { SidebarContainer } from '../../../../containers/sidebar/SidebarContainer';
import { useMousetrap } from '../../../../hooks/useMousetrap';
import { Color } from '../../../../styles/variables.css';
import { tryNextFocus, tryPreviousFocus } from '../../../../utils/focus';
import { List } from '../../../List';
import { PoweredBy } from '../../../PoweredBy';
import { SearchBox } from '../../../SearchBox';
import { Spacer } from '../../../Spacer';
import { SignChangedIcon } from '../../../icons/SignChangedIcon';
import { SignDeletedIcon } from '../../../icons/SignDeletedIcon';
import { SignNewIcon } from '../../../icons/SignNewIcon';
import { SignPassedIcon } from '../../../icons/SignPassedIcon';
import { Summary } from '../Summary';
import { Toggle } from '../Toggle';
import * as styles from './SidebarInner.css';

export type Props = {
  scrollerRef?: React.RefObject<HTMLDivElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
  listRef?: React.RefObject<HTMLDivElement>;
};

export const SidebarInner = ({ scrollerRef, inputRef, listRef }: Props) => {
  const entities = EntityContainer.useContainer();
  const sidebar = SidebarContainer.useContainer();
  const innerRef = scrollerRef || createRef();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      entities.filter(e.target.value);
    },
    [entities],
  );

  useMousetrap(['up', 'k'], innerRef.current, (e) => {
    e.preventDefault();
    e.stopPropagation();
    tryPreviousFocus(innerRef.current);
  });

  useMousetrap(['down', 'j'], innerRef.current, (e) => {
    e.preventDefault();
    e.stopPropagation();
    tryNextFocus(innerRef.current);
  });

  return (
    <>
      <div ref={innerRef} className={styles.inner} id="sidebar">
        <SearchBox
          inputRef={inputRef}
          placeholder="Filter by file name"
          onChange={handleChange}
        />

        <Spacer variant="margin" x={3} />

        <div ref={listRef}>
          <List header="SUMMARY">
            <Summary
              forceOpen={entities.filtering}
              label="CHANGED"
              icon={<SignChangedIcon fill={Color.SIGN_CHANGED} />}
              items={sidebar.failedItems}
              size={entities.failedItems.length}
            />
            <Summary
              forceOpen={entities.filtering}
              label="NEW"
              icon={<SignNewIcon fill={Color.SIGN_NEW} />}
              items={sidebar.newItems}
              size={entities.newItems.length}
            />
            <Summary
              forceOpen={entities.filtering}
              label="DELETED"
              icon={<SignDeletedIcon fill={Color.SIGN_DELETED} />}
              items={sidebar.deletedItems}
              size={entities.deletedItems.length}
            />
            <Summary
              forceOpen={entities.filtering}
              label="PASSED"
              icon={<SignPassedIcon fill={Color.SIGN_PASSED} />}
              items={sidebar.passedItems}
              size={entities.passedItems.length}
            />
          </List>
        </div>

        <Spacer variant="margin" x={3} />

        {sidebar.links.length > 0 && (
          <List header="LINKS">
            {sidebar.links.map(({ label, href }) => (
              <List.Item key={label} href={href}>
                {label}
              </List.Item>
            ))}
          </List>
        )}

        <Spacer variant="margin" x={3} />

        <PoweredBy />
      </div>

      <div className={styles.toggleWrapper}>
        <Toggle open={sidebar.isOpen} onClick={sidebar.toggle} />
      </div>
    </>
  );
};
