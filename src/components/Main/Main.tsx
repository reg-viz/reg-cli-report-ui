import React, { useCallback } from 'react';
import { Space, BreakPoint, Size } from '../../styles/variables';
import type { RegVariant, RegEntity } from '../../types/reg';
import { Container } from '../Container';
import { Card } from '../Card';
import { EntityContainer } from '../../containers/entity/EntityContainer';
import { NotificationContainer } from '../../containers/notification/NotificationContainer';
import { VGrid } from '../VGrid';

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

const Content: React.FC<{ variant: RegVariant; entities: RegEntity[] }> = ({
  variant,
  entities,
}) => {
  const notification = NotificationContainer.useContainer();
  const title = titles[variant];

  const handleCopy = useCallback(() => {
    notification.notify('Copied URL to clipboard');
  }, [notification]);

  if (entities.length < 1) {
    return null;
  }

  return (
    <>
      <h2 id={variant}>{title}</h2>
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

export const Main: React.FC<Props> = () => {
  const entities = EntityContainer.useContainer();

  return (
    <Container>
      <h1>REPORT DETAIL</h1>
      {entities.filtering && entities.allItems.length === 0 ? (
        <>
          <h2>Not found</h2>
          <p>
            No items found that match the text entered.
            <br />
            Try filtering with different keywords :)
          </p>
        </>
      ) : (
        <>
          <Content variant="changed" entities={entities.failedItems} />
          <Content variant="new" entities={entities.newItems} />
          <Content variant="deleted" entities={entities.deletedItems} />
          <Content variant="passed" entities={entities.passedItems} />
        </>
      )}
    </Container>
  );
};
