import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { SignChangedIcon } from '../icons/SignChangedIcon';
import { Color } from '../../styles/variables';
import { List } from './';

export default {
  title: 'List',
  decorators: [withPadding()],
};

export const Overview = () => (
  <List header="HEADER">
    <List.Item href="#">Item 1</List.Item>
    <List.Item href="#">Item 2</List.Item>
    <List.Expandable
      large={true}
      defaultOpen={true}
      label="Large expandable 1"
      meta="meta text"
      icon={<SignChangedIcon fill={Color.SIGN_CHANGED} />}
    >
      <List.Item depth={1} href="#">
        Nest Item 1
      </List.Item>
      <List.Item depth={1} href="#">
        Nest Item 2
      </List.Item>
    </List.Expandable>
    <List.Expandable defaultOpen={true} label="Expandable 1">
      <List.Item depth={1} href="#">
        Nest Item 1
      </List.Item>
      <List.Item depth={1} href="#">
        Nest Item 2
      </List.Item>
      <List.Expandable depth={1} label="Next expandable 1">
        <List.Item depth={2} href="#">
          Nest Item 1
        </List.Item>
        <List.Item depth={2} href="#">
          Nest Item 2
        </List.Item>
      </List.Expandable>
    </List.Expandable>
    <List.Expandable label="Expandable 2">
      <List.Item depth={1} href="#">
        Nest Item 1
      </List.Item>
      <List.Item depth={1} href="#">
        Nest Item 2
      </List.Item>
    </List.Expandable>
  </List>
);

export const WithLongText = () => (
  <List>
    <List.Item href="#">{'Long text '.repeat(20).trim()}</List.Item>
    <List.Expandable defaultOpen={true} label={'Long text '.repeat(20).trim()}>
      <List.Item depth={1} href="#">
        {'Long text '.repeat(20).trim()}
      </List.Item>
    </List.Expandable>
    <List.Expandable
      label={'Long text '.repeat(20).trim()}
      meta="meta text"
      icon={<SignChangedIcon fill={Color.SIGN_CHANGED} />}
    >
      <li>hidden content</li>
    </List.Expandable>
  </List>
);

export const WithControledExpandable = () => (
  <List>
    <List.Expandable open={true} label="Controled expandable (open)">
      <List.Item depth={1} href="#">
        Nest Item 1
      </List.Item>
    </List.Expandable>
    <List.Expandable open={false} label="Controled expandable (close)">
      <List.Item depth={1} href="#">
        Nest Item 1
      </List.Item>
    </List.Expandable>
  </List>
);
