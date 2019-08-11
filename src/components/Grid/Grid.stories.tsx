import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { withPadding } from '../../styles/storybook-decorators';
import { Grid } from './';

const Box = styled.div`
  padding: 8px;
  border-radius: 3px;
  background: #ddd;
  text-align: center;
`;

storiesOf('Grid', module)
  .addDecorator(withPadding())
  .add('overview', () => (
    <Grid
      xs={{
        gap: 20,
        columns: 'repeat(auto-fill, minmax(390px, 1fr))',
      }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <Grid.Cell key={i}>
          <Box>{i + 1}</Box>
        </Grid.Cell>
      ))}
    </Grid>
  ))
  .add('with 2 cell', () => (
    <Grid xs={{ columns: 'repeat(auto-fill, minmax(390px, 1fr))' }}>
      {Array.from({ length: 2 }).map((_, i) => (
        <Grid.Cell key={i}>
          <Box>{i + 1}</Box>
        </Grid.Cell>
      ))}
    </Grid>
  ));
