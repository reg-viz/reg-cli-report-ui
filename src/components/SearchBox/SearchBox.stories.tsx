import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
import { SearchBox } from './';

storiesOf('SearchBox', module)
  .addDecorator(withPadding())
  .add('overview', () => <SearchBox placeholder="Filter by file name" onChange={action('onChange')} />);
