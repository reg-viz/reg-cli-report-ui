import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Space, Color } from '../../../../styles/variables';
import { SearchBox } from '../../../SearchBox';
import { Spacer } from '../../../Spacer';
import { Summary } from '../Summary';
import { List } from '../../../List';
import { SignChangedIcon } from '../../../icons/SignChangedIcon';
import { SidebarContainer } from '../../../../containers/sidebar/SidebarContainer';
import { SignNewIcon } from '../../../icons/SignNewIcon';
import { SignDeletedIcon } from '../../../icons/SignDeletedIcon';
import { SignPassedIcon } from '../../../icons/SignPassedIcon';
import { PoweredBy } from '../../../PoweredBy';
import { Toggle } from '../Toggle';
import { useMousetrap } from '../../../../hooks/useMousetrap';
import { tryPreviousFocus, tryNextFocus } from '../../../../utils/focus';
import { EntityContainer } from '../../../../containers/entity/EntityContainer';

const Inner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  overflow-x: visible;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .sidebar-exit-done & {
    display: none;
  }
`;

const ToggleWrapper = styled.div`
  position: absolute;
  top: ${Space * 2}px;
  left: calc(100% + ${Space * 2}px);
`;

export type Props = {
  inputRef?: React.RefObject<HTMLInputElement>;
  listRef?: React.RefObject<HTMLDivElement>;
};

export const SidebarInner: React.FC<Props> = ({ inputRef, listRef }) => {
  const entities = EntityContainer.useContainer();
  const sidebar = SidebarContainer.useContainer();

  const innerRef = useRef<HTMLDivElement>(null);

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
      <Inner ref={innerRef} id="sidebar">
        <SearchBox inputRef={inputRef} placeholder="Filter by file name" onChange={handleChange} />

        <Spacer variant="margin" x={3} />

        <div ref={listRef}>
          <List header="SUMMARY">
            <Summary
              forceOpen={entities.filtering}
              label="CHANGED"
              icon={<SignChangedIcon fill={Color.SIGN_CHANGED} />}
              items={sidebar.failedItems}
            />
            <Summary
              forceOpen={entities.filtering}
              label="NEW"
              icon={<SignNewIcon fill={Color.SIGN_NEW} />}
              items={sidebar.newItems}
            />
            <Summary
              forceOpen={entities.filtering}
              label="DELETED"
              icon={<SignDeletedIcon fill={Color.SIGN_DELETED} />}
              items={sidebar.deletedItems}
            />
            <Summary
              forceOpen={entities.filtering}
              label="PASSED"
              icon={<SignPassedIcon fill={Color.SIGN_PASSED} />}
              items={sidebar.passedItems}
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
      </Inner>

      <ToggleWrapper>
        <Toggle open={sidebar.isOpen} onClick={sidebar.toggle} />
      </ToggleWrapper>
    </>
  );
};
