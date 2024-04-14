import React from 'react';
import type { Props as DialogProps } from '../Dialog';
import { Dialog } from '../Dialog';
import * as styles from './HelpDialog.css';

const Title = ({ children }: React.PropsWithChildren) => (
  <tr>
    <th className={styles.headerCell} colSpan={2}>
      {children}
    </th>
  </tr>
);

const Item = ({
  description,
  shortcuts,
}: {
  description: React.ReactNode;
  shortcuts: (string | string[])[];
}) => {
  return (
    <tr>
      <td className={styles.dataCell}>{description}</td>
      <td className={styles.dataCell}>
        {shortcuts.map((key, i) => {
          if (Array.isArray(key)) {
            return key.map((k) => (
              <React.Fragment key={k}>
                <kbd className={styles.key}>{k}</kbd>
              </React.Fragment>
            ));
          }

          return (
            <React.Fragment key={key}>
              {i > 0 && <span> or </span>}
              <kbd className={styles.key}>{key}</kbd>
            </React.Fragment>
          );
        })}
      </td>
    </tr>
  );
};

export type Props = Omit<DialogProps, 'id' | 'title'>;

export const HelpDialog = ({ ...rest }: Props) => (
  <Dialog {...rest} id="help-dialog" title="Keyboard shortcuts">
    <div className={styles.wrapper}>
      <table className={styles.table}>
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
    </div>
  </Dialog>
);
