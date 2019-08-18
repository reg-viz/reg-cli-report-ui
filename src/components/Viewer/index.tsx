import React, { useCallback } from 'react';
import { ViewerContainer } from '../../containers/viewer/ViewerContainer';
import { EntityContainer } from '../../containers/entity/EntityContainer';
import { Viewer as Component } from './Viewer';

export type Props = {};

const Renderer: React.FC = () => {
  const { allItems } = EntityContainer.useContainer();
  const viewer = ViewerContainer.useContainer();

  const handleNext = useCallback(() => {
    viewer.next();
  }, [viewer]);

  const handlePrevious = useCallback(() => {
    viewer.previous();
  }, [viewer]);

  const handleClose = useCallback(() => {
    viewer.close();
  }, [viewer]);

  return (
    <Component
      total={allItems.length}
      current={viewer.current.index + 1}
      entity={viewer.current.entity}
      matching={viewer.current.matching}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onRequestClose={handleClose}
    />
  );
};

export const Viewer: React.FC<Props> = () => <Renderer />;
