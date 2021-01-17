import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { MoreIcon } from '../icons/MoreIcon';
import { Color } from '../../styles/variables';
import { CloseIcon } from '../icons/CloseIcon';
import { HelpIcon } from '../icons/HelpIcon';
import { IconButton } from './';

export default {
  title: 'IconButton',
  decorators: [withPadding()],
};

export const Overview = () => (
  <>
    <IconButton>
      <MoreIcon fill={Color.TEXT_SUB} />
    </IconButton>

    <IconButton>
      <CloseIcon fill={Color.BRAND_PRIMARY} />
    </IconButton>

    <IconButton variant="dark">
      <HelpIcon fill={Color.TEXT_SUB} />
    </IconButton>
  </>
);
