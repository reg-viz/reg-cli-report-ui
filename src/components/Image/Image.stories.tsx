import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Image } from './';

storiesOf('Image', module)
  .addDecorator(withPadding())
  .add('overview', () => <Image width={500} height={200} src="https://placehold.it/500x200" />)
  .add('with lazy', () => (
    <>
      <div style={{ paddingTop: '200vh' }} />
      <Image src="https://placehold.it/2000x600" lazy={true} width="100%" height="30%" fit="contain" />
      <div style={{ paddingTop: '200vh' }} />
    </>
  ));
