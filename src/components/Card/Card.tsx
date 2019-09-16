import React, { useCallback } from 'react';
import styled from 'styled-components';
import * as clipboard from 'clipboard-polyfill';
import { Space, Color, Shadow, Focus, BreakPoint, Typography } from '../../styles/variables';
import { RegEntity, RegVariant } from '../../types/reg';
import { Image } from '../Image';
import { Ellipsis } from '../internal/Ellipsis';
import { IconButton } from '../IconButton';
import { MoreIcon } from '../icons/MoreIcon';
import { Sign } from '../Sign';
import { Menu } from '../Menu';
import { Transparent } from '../internal/Transparent';
import { BaseButton } from '../internal/BaseButton';

const Wrapper = styled.div`
  position: relative;
`;

const Inner = styled(BaseButton)`
  display: block;
  width: 100%;
  border-radius: 3px;
  background: ${Color.WHITE};
  box-shadow: ${Shadow.LEVEL1};
  color: ${Color.DEFAULT};
  font-size: inherit;
  text-decoration: none;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: ${Focus};
  }
`;

const CardSign = styled.div`
  position: absolute;
  top: ${Space * 1}px;
  left: ${Space * 1}px;
  z-index: 10;
`;

const CardImage = styled.div`
  position: relative;
  overflow: hidden;
  height: 260px;
`;

const CardImageInner = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
`;

const CardText = styled.div`
  ${Typography.BODY1};
  padding: ${Space * 2}px;
  text-align: left;

  @media (min-width: ${BreakPoint.MEDIUM}px) {
    padding: ${Space * 3}px;
  }
`;

const CardMenu = styled.div`
  position: absolute;
  top: ${Space * 0.5}px;
  right: ${Space * 0.5}px;
  z-index: 10;
`;

const imageSrc = (entity: RegEntity) => {
  switch (entity.variant) {
    case 'changed':
      return entity.diff;
    case 'new':
    case 'passed':
      return entity.after;
    case 'deleted':
      return entity.before;
  }
};

export type Props = {
  entity: RegEntity;
  menus: { label: string; href: string }[];
  onClick: (id: string) => void;
  onCopy: () => void;
};

export const Card: React.FC<Props> = ({ entity, menus, onClick, onCopy }) => {
  const anchor = React.useRef<any>(null);
  const [open, setOpen] = React.useState(false);

  const handleMenuOpen = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(false);
      onClick(entity.id);
    },
    [entity.id, onClick],
  );

  const handleCopyClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      await clipboard.writeText(`${window.location.origin}#${entity.id}`);
      onCopy();
    },
    [entity.id, onCopy],
  );

  return (
    <Wrapper id={entity.id}>
      <Inner type="button" onClick={handleOpenClick}>
        <CardSign>
          <Sign variant={entity.variant} />
        </CardSign>

        <CardImage>
          <CardImageInner>
            <Image lazy={true} src={imageSrc(entity)} width="100%" height="100%" fit="contain" />
          </CardImageInner>
          <Transparent />
        </CardImage>

        <CardText>
          <Ellipsis>{entity.name}</Ellipsis>
        </CardText>
      </Inner>

      <CardMenu>
        <IconButton ref={anchor} aria-owns={`${entity.id}-menu`} onClick={handleMenuOpen}>
          <MoreIcon fill={Color.DEFAULT} />
        </IconButton>
        <Menu id={`${entity.id}-menu`} placement="bottom-left" anchor={anchor} open={open} onRequestClose={handleClose}>
          <Menu.Item onClick={handleOpenClick}>Open</Menu.Item>
          <Menu.Item onClick={handleCopyClick}>Copy Link</Menu.Item>
          {menus.map(({ label, href }, i) => (
            <Menu.Item key={i} href={href}>
              {label}
            </Menu.Item>
          ))}
        </Menu>
      </CardMenu>
    </Wrapper>
  );
};

export const CardDimmer: React.FC<{ variant: RegVariant }> = React.memo(({ variant }) => {
  return (
    <Wrapper>
      <Inner type="button">
        <CardSign>
          <Sign variant={variant} />
        </CardSign>

        <CardImage>
          <Transparent />
        </CardImage>

        <CardText>
          <Ellipsis>---------</Ellipsis>
        </CardText>
      </Inner>
    </Wrapper>
  );
});
