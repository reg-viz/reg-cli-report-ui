import React from 'react';
import type { FC } from 'react';
import type { FlakeData } from '../types/reg';

export const FlakeMark: FC<FlakeData> = ({
  modificationCount,
  totalCommitCount,
  periodInDays,
}) => {
  const showFlakeMark = modificationCount !== undefined && modificationCount > 0;

  if (!showFlakeMark) {
    return null;
  }

  return (
    <span style={{ margin: '0 16px' }}>
      <strong>
        {Math.round(((modificationCount || 1) * 100) / (totalCommitCount || 1))}
        % flaky
      </strong>
      {periodInDays && ` over the past ${periodInDays} day(s)`}
    </span>
  );
};
