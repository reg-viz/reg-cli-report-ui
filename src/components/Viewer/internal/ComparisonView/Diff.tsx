import React from 'react';
import { Image } from '../../../Image';

export type Props = {
  src: string;
};

export const Diff = ({ src }: Props) => <Image src={src} />;
