import React, { useEffect, useRef, useState } from 'react';
import type { RegStructualItem } from '../../../../types/reg';
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
  size: number;
};

const SummaryListItem: React.FC<{
  forceOpen: boolean;
  label: string;
  depth: number;
  item: RegStructualItem;
}> = ({ forceOpen, label, depth, item }) => {
  const [open, setOpen] = useForceOpen(forceOpen);

  if (item.children.length > 0) {
    return (
      <List.Expandable
        key={`${label}${item.name}`}
        open={open}
        depth={depth}
        label={item.name}
        onChange={setOpen}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        <SummaryList
          forceOpen={forceOpen}
          label={label}
          depth={depth + 1}
          items={item.children}
        />
      </List.Expandable>
    );
  }

  return (
    <List.Item
      key={item.id}
      depth={depth + 1}
      href={`#${item.id}`}
      title={item.path}
    >
      {item.name}
    </List.Item>
  );
};

const SummaryList: React.FC<{
  forceOpen: boolean;
  label: string;
  depth: number;
  items: RegStructualItem[];
}> = ({ items, ...rest }) => (
  <>
    {items.map((item) => (
      <SummaryListItem key={item.id} {...rest} item={item} />
    ))}
  </>
);

export const Summary: React.FC<Props> = ({
  forceOpen,
  label,
  icon,
  items,
  size,
}) => {
  const [open, setOpen] = useForceOpen(forceOpen);

  if (items.length < 1) {
    return null;
  }

  return (
    <List.Expandable
      large
      open={open}
      label={label}
      meta={`${size} items`}
      icon={icon}
      onChange={setOpen}
    >
      <SummaryList
        forceOpen={forceOpen}
        label={label}
        depth={1}
        items={items}
      />
    </List.Expandable>
  );
};
