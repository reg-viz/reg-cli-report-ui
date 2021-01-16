import React from 'react';
import styled from 'styled-components';
import { Space, FontFamily, Typography, Color } from '../../styles/variables';
import type { Props as DialogProps } from '../Dialog';
import { Dialog } from '../Dialog';

const Wrapper = styled.div`
  padding-bottom: ${Space * 1}px;

  & table {
    width: 100%;
    border-collapse: collapse;

    & tr:first-child th {
      padding-top: 0;
    }

    & th {
      ${Typography.SUBTITLE2};
      padding: ${Space * 4}px 0 ${Space * 1}px;
      text-align: left;
    }

    & td {
      ${Typography.BODY2};
      padding: ${Space * 1}px 0;
      border-bottom: 1px solid ${Color.BORDER};
      text-align: left;
    }
  }

  & kbd {
    display: inline-block;
    padding: 8px 14px;
    border-radius: 3px;
    border: 1px solid #f4f4f4;
    background: linear-gradient(180deg, #f3f3f3 0%, #ececec 100%);
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25);
    font-weight: bold;
    font-family: ${FontFamily.MONOSPACE};
    line-height: 1;

    & + kbd {
      margin-left: 0.5em;
    }
  }
`;

const Title: React.FC = ({ children }) => (
  <tr>
    <th colSpan={2}>{children}</th>
  </tr>
);

const Item: React.FC<{
  description: React.ReactNode;
  shortcuts: (string | string[])[];
}> = ({ description, shortcuts }) => {
  return (
    <tr>
      <td>{description}</td>
      <td>
        {shortcuts.map((key, i) => {
          if (Array.isArray(key)) {
            return key.map((k) => (
              <React.Fragment key={k}>
                <kbd>{k}</kbd>
              </React.Fragment>
            ));
          }

          return (
            <React.Fragment key={key}>
              {i > 0 && <span> or </span>}
              <kbd>{key}</kbd>
            </React.Fragment>
          );
        })}
      </td>
    </tr>
  );
};

export type Props = Omit<DialogProps, 'id' | 'title'>;

export const HelpDialog: React.FC<Props> = ({ ...rest }) => (
  <Dialog {...rest} id="help-dialog" title="Keyboard shortcuts">
    <Wrapper>
      <table>
        <tbody>
          <Title>Application</Title>
          <Item description="Focus filter bar" shortcuts={['/', 's']} />
          <Item description="Toggle Sidebar" shortcuts={['f']} />
          <Item description="Bring up this dialog" shortcuts={['?']} />

          <Title>Navigation</Title>
          <Item description="Go to Sidebar" shortcuts={[['g', 's']]} />
          <Item description="Go to CHANGED ITEMS" shortcuts={[['g', 'c']]} />
          <Item description="Go to NEW ITEMS" shortcuts={[['g', 'n']]} />
          <Item description="Go to DELETED ITEMS" shortcuts={[['g', 'd']]} />
          <Item description="Go to PASSED ITEMS" shortcuts={[['g', 'p']]} />

          <Title>Viewer</Title>
          <Item description="Close Viewer" shortcuts={['Esc']} />
          <Item description="Next item" shortcuts={['→', 'l']} />
          <Item description="Previous item" shortcuts={['←', 'h']} />
        </tbody>
      </table>
    </Wrapper>
  </Dialog>
);
