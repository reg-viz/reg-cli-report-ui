import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Spacer } from './';

const Bar: React.FC = () => <div style={{ height: 50, background: '#333' }} />;

storiesOf('Spacer', module)
  .addDecorator(withPadding())
  .add('with margin', () => (
    <>
      <Bar />
      <Spacer variant="margin" x={1} />
      <Bar />
      <Spacer variant="margin" x={2} />
      <Bar />
      <Spacer variant="margin" x={3} />
      <Bar />
      <Spacer variant="margin" x={4} />
      <Bar />
      <Spacer variant="margin" x={5} />
      <Bar />
    </>
  ))
  .add('with padding', () => (
    <>
      <Bar />
      <Spacer variant="padding" x={1} />
      <Bar />
      <Spacer variant="padding" x={2} />
      <Bar />
      <Spacer variant="padding" x={3} />
      <Bar />
      <Spacer variant="padding" x={4} />
      <Bar />
      <Spacer variant="padding" x={5} />
      <Bar />
    </>
  ));
