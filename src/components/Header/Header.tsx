import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Space, Color, Shadow, FontSize, Size, BreakPoint } from '../../styles/variables';
import { CloseIcon } from '../icons/CloseIcon';
import { IconButton } from '../IconButton';
import { RegVariant } from '../../types/reg';
import { Sign } from '../Sign';
import { Ellipsis } from '../internal/Ellipsis';

const Wrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${Space * 1}px;
  height: ${Size.HEADER_HEIGHT}px;
  background: ${Color.WHITE};
  box-shadow: ${Shadow.LEVEL2};

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
    display: block;
    align-self: center;
    text-align: center;
    font-size: ${FontSize.SMALL};
  }
`;

const Right = styled.div`
  align-self: center;
  padding-right: ${Space * 2}px;
  text-align: right;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: ${FontSize.MEDIUM};
`;

const TitleSign = styled.span`
  flex: 0 0 auto;
  margin-right: ${Space * 1}px;
`;

const TitleText = styled.span`
  display: block;
  flex: 0 1 auto;
  overflow: hidden;
`;

export type Props = {
  variant: RegVariant;
  title: string;
  current: number;
  max: number;
  onRequestClose: () => void;
};

export const Header: React.FC<Props> = ({ variant, title, current, max, onRequestClose }) => {
  const handleCloseClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onRequestClose();
    },
    [onRequestClose],
  );

  return (
    <Wrapper>
      <Left>
        <Title>
          <TitleSign>
            <Sign variant={variant} />
          </TitleSign>
          <TitleText>
            <Ellipsis>{title}</Ellipsis>
          </TitleText>
        </Title>
      </Left>

      <Center>
        {current} / {max}
      </Center>

      <Right>
        <IconButton onClick={handleCloseClick}>
          <CloseIcon fill={Color.GRAY} />
        </IconButton>
      </Right>
    </Wrapper>
  );
};
