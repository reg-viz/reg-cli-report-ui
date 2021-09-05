import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  Space,
  Shadow,
  Size,
  BreakPoint,
  Typography,
  Color,
} from '../../styles/variables';
import { CloseIcon } from '../icons/CloseIcon';
import { IconButton } from '../IconButton';
import type { RegVariant } from '../../types/reg';
import { Sign } from '../Sign';
import { Ellipsis } from '../internal/Ellipsis';
import { Switch } from '../Switch';
import { useMedia } from '../../hooks/useMedia';

const Wrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${Space * 1}px;
  height: ${Size.HEADER_HEIGHT}px;
  background: ${Color.WHITE};
  box-shadow: ${Shadow.LEVEL1};

  @media (min-width: ${BreakPoint.SMALL}px) {
    grid-template-columns: 2fr 1fr 2fr;
  }
`;

const Left = styled.div`
  align-self: center;
  overflow: hidden;
  padding-left: ${Space * 2}px;
`;

const Center = styled.div`
  display: none;

  @media (min-width: ${BreakPoint.SMALL}px) {
    ${Typography.BODY2};
    display: block;
    align-self: center;
    text-align: center;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  padding-right: ${Space * 2}px;
  text-align: right;
`;

const Title = styled.h2`
  ${Typography.SUBTITLE2};
  display: flex;
  align-items: center;
  margin: 0;
`;

const TitleSign = styled.span`
  flex: 0 0 auto;
  margin-left: ${Space * 1}px;
`;

const TitleText = styled.span`
  display: block;
  flex: 0 1 auto;
  overflow: hidden;
  margin-left: ${Space * 1}px;
`;

const MarkersToggle = styled.div`
  margin-right: ${Space * 1}px;
  line-height: 0;
`;

export type Props = {
  variant: RegVariant;
  title: string;
  current: number;
  max: number;
  markersEnabled: boolean;
  onRequestClose: () => void;
  onMarkersToggle: (enabled: boolean) => void;
};

export const Header: React.FC<Props> = ({
  variant,
  title,
  current,
  max,
  markersEnabled,
  onRequestClose,
  onMarkersToggle,
}) => {
  const isSmallViewport = useMedia(`(max-width: ${BreakPoint.SMALL - 1}px)`);

  const handleCloseClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onRequestClose();
    },
    [onRequestClose],
  );

  const handleToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onMarkersToggle(e.currentTarget.checked);
    },
    [onMarkersToggle],
  );

  return (
    <Wrapper>
      <Left>
        <Title title={title}>
          <TitleSign>
            <Sign variant={variant} />
          </TitleSign>
          <TitleText>
            <Ellipsis line={2}>{title}</Ellipsis>
          </TitleText>
        </Title>
      </Left>

      <Center>
        {current} / {max}
      </Center>

      <Right>
        <IconButton onClick={handleCloseClick}>
          <CloseIcon fill={Color.TEXT_SUB} />
        </IconButton>

        <MarkersToggle>
          <Switch
            id="toggle-markers"
            prepend={isSmallViewport ? null : 'Markers'}
            checked={markersEnabled}
            onChange={handleToggle}
          />
        </MarkersToggle>
      </Right>
    </Wrapper>
  );
};
