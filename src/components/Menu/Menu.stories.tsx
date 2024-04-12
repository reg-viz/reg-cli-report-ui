import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import type { Placement } from './';
import { Menu } from './';

type Component = typeof Menu;
type Story = StoryObj<Component>;

export default {
  component: Menu,
} satisfies Meta<Component>;

export const Overview: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<Placement>('bottom-left');
    const btn = useRef<HTMLButtonElement>(null);

    return (
      <>
        <div style={{ padding: '250px 0', textAlign: 'center' }}>
          <select
            value={placement}
            onChange={(e: any) => {
              setPlacement(e.target.value);
            }}
          >
            <option value="top-left">top-left</option>
            <option value="top">top</option>
            <option value="top-right">top-right</option>
            <option value="right">right</option>
            <option value="bottom-right">bottom-right</option>
            <option value="bottom">bottom</option>
            <option value="bottom-left">bottom-left</option>
            <option value="left">left</option>
          </select>
          <button
            ref={btn}
            type="button"
            aria-owns={open ? 'menu' : undefined}
            aria-haspopup="true"
            onClick={() => {
              setOpen(true);
            }}
          >
            Open Menu
          </button>
        </div>

        <Menu
          id="menu"
          open={open}
          anchor={btn}
          placement={placement}
          onRequestClose={() => {
            setOpen(false);
          }}
        >
          <Menu.Item onClick={action('onClick') as any}>Button 1</Menu.Item>
          <Menu.Item href="#anchor-click">Anchor 1</Menu.Item>
          <Menu.Item onClick={action('onClick') as any}>Button 2</Menu.Item>
          <Menu.Item href="#anchor-click">Anchor 2</Menu.Item>
        </Menu>
      </>
    );
  },
};

export const WithLongContent: Story = {
  render: () => (
    <Menu id="menu" open={true}>
      <Menu.Item>{'Long content '.repeat(10)}</Menu.Item>
      <Menu.Item>{'Long content '.repeat(15)}</Menu.Item>
      <Menu.Item>{'Long content '.repeat(20)}</Menu.Item>
    </Menu>
  ),
};
