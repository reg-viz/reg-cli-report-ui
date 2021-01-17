import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
import { Dialog } from './';

const defaultProps = {
  id: 'dialog',
  open: true,
  title: 'Dialog',
  onRequestClose: action('onRequestClose'),
};

const Demo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </button>

      <Dialog
        {...defaultProps}
        open={open}
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        Dialog content
      </Dialog>
    </>
  );
};

export default {
  title: 'Dialog',
  decorators: [withPadding()],
};

export const Overview = () => <Demo />;

export const WithOpen = () => (
  <Dialog {...defaultProps}>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa.
    </p>
    <p>
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
      quis, sem.
    </p>
    <p>
      Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
      nec, vulputate eget, arcu.
    </p>
    <p>
      In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
      dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
    </p>
    <p>
      Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean
      leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
    </p>
    <p>
      Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
      viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
    </p>
    <p>
      Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam
      eget dui. Etiam rhoncus.
    </p>
    <p>
      Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero,
      sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel,
      luctus pulvinar, hendrerit id, lorem.
    </p>
    <p>
      Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero
      venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros
      faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec
      sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue
      velit cursus nunc,
    </p>
  </Dialog>
);
