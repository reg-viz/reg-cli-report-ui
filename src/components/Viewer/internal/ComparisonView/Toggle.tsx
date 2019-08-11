import React from 'react';
import { Image } from '../../../Image';

export type Props = {
  before: string;
  after: string;
  checked: boolean;
};

export const Toggle: React.FC<Props> = ({ before, after, checked }) => <Image src={checked ? after : before} />;
