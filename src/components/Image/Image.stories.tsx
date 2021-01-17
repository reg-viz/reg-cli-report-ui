import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Image } from './';

export default {
  title: 'Image',
  decorators: [withPadding()],
};

export const Overview = () => (
  <Image width={500} height={200} src="https://via.placeholder.com/500x200" />
);

export const WithLazy = () => (
  <>
    <div style={{ paddingTop: '200vh' }} />
    <Image
      src="https://via.placeholder.com/2000x600"
      lazy={true}
      width="100%"
      height="30%"
      fit="contain"
    />
    <div style={{ paddingTop: '200vh' }} />
  </>
);
