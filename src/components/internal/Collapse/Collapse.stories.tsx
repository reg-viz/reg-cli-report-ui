import React from 'react';
import { withPadding } from '../../../styles/storybook-decorators';
import { Space, Color } from '../../../styles/variables';
import { Collapse } from './';

const content = (
  <div
    style={{
      padding: Space * 2,
      color: '#fff',
      background: Color.BRAND_SECONDARY,
    }}
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel
      tristique risus. Aenean efficitur condimentum auctor. Mauris consectetur
      magna neque, sollicitudin viverra lorem semper eget. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Nulla rhoncus convallis ante, ac
      interdum urna ultricies at. Nulla facilisi. Sed id turpis mi. Nulla semper
      imperdiet suscipit. Mauris quis malesuada risus, a efficitur justo.
    </p>
    <p>
      Mauris accumsan nunc vel purus convallis luctus. Donec bibendum nulla
      lacus, vitae accumsan justo accumsan a. Duis ut nisi posuere, scelerisque
      sem nec, sagittis arcu. Sed vulputate imperdiet maximus. Praesent felis
      libero, consectetur non odio ac, ornare elementum lorem. Integer malesuada
      odio at efficitur volutpat. Sed sed volutpat ipsum. Sed eget lectus vitae
      risus sodales gravida vel vitae ante. Praesent semper nulla non elit
      mattis consectetur. Nullam pulvinar, neque vehicula malesuada ornare, enim
      orci posuere urna, a rutrum urna lorem eget lorem. Cras posuere faucibus
      turpis in fringilla. Etiam iaculis dolor ex. Morbi sollicitudin, purus vel
      vehicula dignissim, lectus urna euismod orci, sed porta tortor erat non
      ligula. Aenean ex risus, tempus facilisis sollicitudin eu, porta vitae
      justo. Nam tincidunt felis arcu, consectetur efficitur sapien euismod
      quis. Integer consequat erat id nibh maximus malesuada.
    </p>
  </div>
);

const Demo = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Toggle
      </button>

      <div style={{ marginBottom: Space * 2 }} />

      <Collapse open={open} duration={{ enter: 360, exit: 240 }}>
        {content}
      </Collapse>
    </>
  );
};

export default {
  title: 'internal/Collapse',
  decorators: [withPadding()],
};

export const Overview = () => <Demo />;

export const WithOpen = () => (
  <Collapse open={true} duration={{ enter: 0, exit: 0 }}>
    {content}
  </Collapse>
);

export const WithClose = () => (
  <Collapse open={false} duration={{ enter: 0, exit: 0 }}>
    {content}
  </Collapse>
);
