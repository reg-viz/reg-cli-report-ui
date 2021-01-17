import React from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
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

const defaultProps = {
  options: options3,
  onChange: action('onChange'),
};

const Demo: React.FC = () => {
  const [value, setValue] = React.useState(options3[1].value);

  return (
    <ChoiceGroup
      value={value}
      options={options3}
      onChange={(val) => {
        setValue(val);
      }}
    />
  );
};

export default {
  title: 'ChoiceGroup',
  decorators: [withPadding()],
};

export const Overview = () => <Demo />;

export const WithSelected = () => (
  <>
    <ChoiceGroup {...defaultProps} value={options3[0].value} />
    <Spacer variant="margin" x={2} />
    <ChoiceGroup {...defaultProps} value={options3[1].value} />
    <Spacer variant="margin" x={2} />
    <ChoiceGroup {...defaultProps} value={options3[2].value} />
  </>
);

export const With4Options = () => (
  <>
    <ChoiceGroup
      {...defaultProps}
      options={options4}
      value={options4[0].value}
    />
    <Spacer variant="margin" x={2} />
    <ChoiceGroup
      {...defaultProps}
      options={options4}
      value={options4[1].value}
    />
    <Spacer variant="margin" x={2} />
    <ChoiceGroup
      {...defaultProps}
      options={options4}
      value={options4[2].value}
    />
    <Spacer variant="margin" x={2} />
    <ChoiceGroup
      {...defaultProps}
      options={options4}
      value={options4[3].value}
    />
  </>
);
