import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Space, BreakPoint } from '../../styles/variables';
import { RegVariant, RegEntity } from '../../types/reg';
import { Container } from '../Container';
import { Card } from '../Card';
import { EntityContainer } from '../../containers/entity/EntityContainer';
import { ViewerContainer } from '../../containers/viewer/ViewerContainer';
import { NotificationContainer } from '../../containers/notification/NotificationContainer';

const titles: { [K in RegVariant]: string } = {
  new: 'NEW ITEMS',
  passed: 'PASSED ITEMS',
  changed: 'CHANGED ITEMS',
  deleted: 'DELETED ITEMS',
};

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${Space * 5}px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: ${BreakPoint.X_LARGE}px) {
    grid-template-columns: repeat(auto-fill, 540px);
  }
`;

export type Props = {};

const Content: React.FC<{ variant: RegVariant; entities: RegEntity[] }> = ({ variant, entities }) => {
  const notification = NotificationContainer.useContainer();
  const viewer = ViewerContainer.useContainer();

  const title = titles[variant];

  const handleClick = useCallback(
    (id: string) => {
      viewer.open(id);
    },
    [viewer],
  );

  const handleCopy = useCallback(() => {
    notification.notify('Copied URL to clipboard');
  }, [notification]);

  if (entities.length < 1) {
    return null;
  }

  return (
    <>
      <h2 id={variant}>{title}</h2>
      <CardList>
        {entities.map((entity) => (
          <li key={entity.id}>
            <Card entity={entity} menus={[]} onClick={handleClick} onCopy={handleCopy} />
          </li>
        ))}
      </CardList>
    </>
  );
};

export const Main: React.FC<Props> = () => {
  const { failedItems, newItems, deletedItems, passedItems } = EntityContainer.useContainer();

  return (
    <Container>
      <h1>REPORT DETAIL</h1>
      <Content variant="changed" entities={failedItems} />
      <Content variant="new" entities={newItems} />
      <Content variant="deleted" entities={deletedItems} />
      <Content variant="passed" entities={passedItems} />
    </Container>
  );
};
