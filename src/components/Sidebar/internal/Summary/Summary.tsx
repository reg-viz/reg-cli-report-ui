import React, { useEffect, useRef, useState } from 'react';
import { RegStructualItem } from '../../../../types/reg';
import { List } from '../../../List';

const useForceOpen = (forceOpen: boolean) => {
  const [open, setOpen] = useState(forceOpen);
  const openCache = useRef(open);

  useEffect(() => {
    if (forceOpen) {
      openCache.current = open;
      setOpen(true);
    } else {
      setOpen(openCache.current);
    }
  }, [forceOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return [open, setOpen] as const;
};

export type Props = {
  forceOpen: boolean;
  label: string;
  icon: React.ReactNode;
  items: RegStructualItem[];
};

const SummaryItemList: React.FC<{ forceOpen: boolean; label: string; depth: number; items: RegStructualItem[] }> = ({
  forceOpen,
  label,
  depth,
  items,
}) => {
  const [open, setOpen] = useForceOpen(forceOpen);

  if (items.length < 1) {
    return null;
  }

  return (
    <>
      {items.map((item) => {
        if (item.children.length > 0) {
          return (
            <List.Expandable
              key={`${label}${item.name}`}
              open={open}
              depth={depth}
              label={item.name}
              onChange={setOpen}>
              <SummaryItemList forceOpen={forceOpen} label={label} depth={depth + 1} items={item.children} />
            </List.Expandable>
          );
        }

        return (
          <List.Item key={item.id} depth={depth + 1} href={`#${item.id}`} title={item.path}>
            {item.name}
          </List.Item>
        );
      })}
    </>
  );
};

export const Summary: React.FC<Props> = ({ forceOpen, label, icon, items }) => {
  const [open, setOpen] = useForceOpen(forceOpen);

  if (items.length < 1) {
    return null;
  }

  return (
    <List.Expandable large open={open} label={label} meta={`${items.length} items`} icon={icon} onChange={setOpen}>
      <SummaryItemList forceOpen={forceOpen} label={label} depth={1} items={items} />
    </List.Expandable>
  );
};
