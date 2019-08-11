import React from 'react';
import { Image } from '../../../Image';

export type Props = {
  src: string;
};

export const Diff: React.FC<Props> = ({ src }) => <Image src={src} />;
