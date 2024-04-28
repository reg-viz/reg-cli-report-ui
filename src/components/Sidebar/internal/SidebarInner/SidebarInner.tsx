import React, { useCallback, useRef } from 'react';
import { useKey } from '../../../../hooks/useKey';
import { useMergeRefs } from '../../../../hooks/useMergeRefs';
import { useEntities, useEntityFilter } from '../../../../states/entity';
import {
  useSidebarEntities,
  useSidebarMutators,
  useSidebarState,
} from '../../../../states/sidebar';
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
  const [isFiltered, filter] = useEntityFilter();
  const { isOpen, links } = useSidebarState();
  const { toggle } = useSidebarMutators();
  const sidebarEntity = useSidebarEntities();
  const entity = useEntities();
  const innerRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      filter(e.target.value);
    },
    [filter],
  );

  useKey(innerRef, ['ArrowUp', 'k'], (e) => {
    e.preventDefault();
    e.stopPropagation();
    tryPreviousFocus(innerRef.current);
  });

  useKey(innerRef, ['ArrowDown', 'j'], (e) => {
    e.preventDefault();
    e.stopPropagation();
    tryNextFocus(innerRef.current);
  });

  const ref = useMergeRefs(innerRef, scrollerRef);

  return (
    <>
      <div ref={ref} className={styles.inner} id="sidebar">
        <SearchBox
          inputRef={inputRef}
          placeholder="Filter by file name"
          onChange={handleChange}
        />

        <Spacer variant="margin" x={3} />

        <div ref={listRef}>
          <List header="SUMMARY">
            <Summary
              forceOpen={isFiltered}
              label="CHANGED"
              icon={<SignChangedIcon fill={Color.SIGN_CHANGED} />}
              items={sidebarEntity.failedItems}
              size={entity.failedItems.length}
            />
            <Summary
              forceOpen={isFiltered}
              label="NEW"
              icon={<SignNewIcon fill={Color.SIGN_NEW} />}
              items={sidebarEntity.newItems}
              size={entity.newItems.length}
            />
            <Summary
              forceOpen={isFiltered}
              label="DELETED"
              icon={<SignDeletedIcon fill={Color.SIGN_DELETED} />}
              items={sidebarEntity.deletedItems}
              size={entity.deletedItems.length}
            />
            <Summary
              forceOpen={isFiltered}
              label="PASSED"
              icon={<SignPassedIcon fill={Color.SIGN_PASSED} />}
              items={sidebarEntity.passedItems}
              size={entity.passedItems.length}
            />
          </List>
        </div>

        <Spacer variant="margin" x={3} />

        {links.length > 0 && (
          <List header="LINKS">
            {links.map(({ label, href }) => (
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
        <Toggle open={isOpen} onClick={toggle} />
      </div>
    </>
  );
};
