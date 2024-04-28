import React, { useCallback } from 'react';
import { useEntities, useEntityFilter } from '../../states/entity';
import { useNotify } from '../../states/notification';
import { BreakPoint, Size, Space } from '../../styles/variables.css';
import type { RegEntity, RegVariant } from '../../types/reg';
import { Card } from '../Card';
import { Container } from '../Container';
import { VGrid } from '../VGrid';
import * as styles from './Main.css';

const titles: { [K in RegVariant]: string } = {
  new: 'NEW ITEMS',
  passed: 'PASSED ITEMS',
  changed: 'CHANGED ITEMS',
  deleted: 'DELETED ITEMS',
};

export type Props = {};

const gridOptions = [
  {
    media: 'screen',
    gap: Space * 5,
    minContentLength: 270,
  },
  {
    media: `screen and (min-width: ${BreakPoint.X_SMALL}px)`,
    gap: Space * 5,
    minContentLength: 300,
  },
  {
    media: `screen and (min-width: ${BreakPoint.SMALL}px)`,
    gap: Space * 5,
    minContentLength: 360,
  },
  {
    media: `screen and (min-width: ${BreakPoint.X_LARGE}px)`,
    gap: Space * 5,
    minContentLength: 540,
  },
];

const Content = ({
  variant,
  entities,
}: {
  variant: RegVariant;
  entities: RegEntity[];
}) => {
  const notify = useNotify();
  const title = titles[variant];

  const handleCopy = useCallback(() => {
    notify('Copied URL to clipboard');
  }, [notify]);

  if (entities.length < 1) {
    return null;
  }

  return (
    <>
      <h2 id={variant} className={styles.sectionTitle}>
        {title}
      </h2>
      <VGrid
        items={entities}
        itemKey="id"
        cellHeight={Size.CARD_OUTER_HEIGHT}
        gridOptions={gridOptions}
      >
        {({ item: entity }) => (
          <Card
            href={`?id=${entity.id}`}
            entity={entity}
            menus={[]}
            onCopy={handleCopy}
          />
        )}
      </VGrid>
    </>
  );
};

export const Main = () => {
  const entity = useEntities();
  const [isFiltering] = useEntityFilter();

  return (
    <Container>
      <h1 className={styles.title}>REPORT DETAIL</h1>

      {isFiltering && entity.allItems.length === 0 ? (
        <>
          <h2 className={styles.sectionTitle}>Not found</h2>
          <p>
            No items found that match the text entered.
            <br />
            Try filtering with different keywords :)
          </p>
        </>
      ) : (
        <>
          <Content variant="changed" entities={entity.failedItems} />
          <Content variant="new" entities={entity.newItems} />
          <Content variant="deleted" entities={entity.deletedItems} />
          <Content variant="passed" entities={entity.passedItems} />
        </>
      )}
    </Container>
  );
};
