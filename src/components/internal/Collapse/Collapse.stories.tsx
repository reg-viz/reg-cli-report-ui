import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Color, Space } from '../../../styles/variables.css';
import { Collapse } from './';

type Component = typeof Collapse;
type Story = StoryObj<Component>;

export default {
  component: Collapse,
  args: {
    children: (
      <div
        style={{
          padding: Space * 2,
          color: '#fff',
          background: Color.BRAND_SECONDARY,
        }}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel
          tristique risus. Aenean efficitur condimentum auctor. Mauris
          consectetur magna neque, sollicitudin viverra lorem semper eget. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Nulla rhoncus
          convallis ante, ac interdum urna ultricies at. Nulla facilisi. Sed id
          turpis mi. Nulla semper imperdiet suscipit. Mauris quis malesuada
          risus, a efficitur justo.
        </p>
        <p>
          Mauris accumsan nunc vel purus convallis luctus. Donec bibendum nulla
          lacus, vitae accumsan justo accumsan a. Duis ut nisi posuere,
          scelerisque sem nec, sagittis arcu. Sed vulputate imperdiet maximus.
          Praesent felis libero, consectetur non odio ac, ornare elementum
          lorem. Integer malesuada odio at efficitur volutpat. Sed sed volutpat
          ipsum. Sed eget lectus vitae risus sodales gravida vel vitae ante.
          Praesent semper nulla non elit mattis consectetur. Nullam pulvinar,
          neque vehicula malesuada ornare, enim orci posuere urna, a rutrum urna
          lorem eget lorem. Cras posuere faucibus turpis in fringilla. Etiam
          iaculis dolor ex. Morbi sollicitudin, purus vel vehicula dignissim,
          lectus urna euismod orci, sed porta tortor erat non ligula. Aenean ex
          risus, tempus facilisis sollicitudin eu, porta vitae justo. Nam
          tincidunt felis arcu, consectetur efficitur sapien euismod quis.
          Integer consequat erat id nibh maximus malesuada.
        </p>
      </div>
    ),
  },
} satisfies Meta<Component>;

export const Overview: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Toggle
        </button>

        <div style={{ marginBottom: Space * 2 }} />

        <Collapse {...args} open={open} duration={{ enter: 360, exit: 240 }} />
      </>
    );
  },
};

export const WithOpen: Story = {
  args: {
    open: true,
    duration: { enter: 0, exit: 0 },
  },
};

export const WithClose: Story = {
  args: {
    open: false,
    duration: { enter: 0, exit: 0 },
  },
};
