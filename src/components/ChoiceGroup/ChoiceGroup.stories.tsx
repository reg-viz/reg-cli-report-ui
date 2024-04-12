import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from '../Spacer';
import { ChoiceGroup } from './';

const options3 = [
  {
    value: 'value1',
    label: 'Item 1',
  },
  {
    value: 'value2',
    label: 'Item 2',
  },
  {
    value: 'value3',
    label: 'Item 3',
  },
];

const options4 = [
  ...options3,
  {
    value: 'value4',
    label: 'Item 4',
  },
];

type Component = typeof ChoiceGroup;
type Story = StoryObj<Component>;

export default {
  component: ChoiceGroup,
  args: {
    options: options3,
    onChange: action('onChange'),
  },
} satisfies Meta<Component>;

export const Overview: Story = {
  render: () => {
    const [value, setValue] = useState(options3[1].value);

    return (
      <ChoiceGroup
        value={value}
        options={options3}
        onChange={(val) => {
          setValue(val);
        }}
      />
    );
  },
};

export const WithSelected: Story = {
  render: (args) => (
    <>
      <ChoiceGroup {...args} value={options3[0].value} />
      <Spacer variant="margin" x={2} />
      <ChoiceGroup {...args} value={options3[1].value} />
      <Spacer variant="margin" x={2} />
      <ChoiceGroup {...args} value={options3[2].value} />
    </>
  ),
};

export const With4Options: Story = {
  render: (args) => (
    <>
      <ChoiceGroup {...args} options={options4} value={options4[0].value} />
      <Spacer variant="margin" x={2} />
      <ChoiceGroup {...args} options={options4} value={options4[1].value} />
      <Spacer variant="margin" x={2} />
      <ChoiceGroup {...args} options={options4} value={options4[2].value} />
      <Spacer variant="margin" x={2} />
      <ChoiceGroup {...args} options={options4} value={options4[3].value} />
    </>
  ),
};
