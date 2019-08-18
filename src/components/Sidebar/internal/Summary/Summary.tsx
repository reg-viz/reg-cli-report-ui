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

const SummaryItem: React.FC<{ forceOpen: boolean; label: string; depth: number; item: RegStructualItem }> = ({
  forceOpen,
  label,
  depth,
  item,
}) => {
  const [open, setOpen] = useForceOpen(forceOpen);

  if (item.child != null) {
    return (
      <List.Expandable key={`${label}${item.name}`} open={open} depth={depth} label={item.name} onChange={setOpen}>
        <SummaryItem forceOpen={forceOpen} label={label} depth={depth + 1} item={item.child} />
      </List.Expandable>
    );
  }

  return (
    <List.Item key={item.id} depth={depth + 1} href={`#${item.id}`} title={item.path}>
      {item.name}
    </List.Item>
  );
};

export const Summary: React.FC<Props> = ({ forceOpen, label, icon, items }) => {
  const [open, setOpen] = useForceOpen(forceOpen);

  if (items.length < 1) {
    return null;
  }

  return (
    <List.Expandable large open={open} label={label} meta={`${items.length} items`} icon={icon} onChange={setOpen}>
      {items.map((item) => (
        <SummaryItem forceOpen={forceOpen} key={item.id} label={label} depth={1} item={item} />
      ))}
    </List.Expandable>
  );
};
