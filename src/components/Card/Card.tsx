import * as clipboard from 'clipboard-polyfill';
import React, { useCallback, useRef, useState } from 'react';
import type { RegEntity } from '../../types/reg';
import { IconButton } from '../IconButton';
import { Image } from '../Image';
import { Menu } from '../Menu';
import { Sign } from '../Sign';
import { MoreIcon } from '../icons/MoreIcon';
import { BaseButton } from '../internal/BaseButton';
import { Ellipsis } from '../internal/Ellipsis';
import { Transparent } from '../internal/Transparent';
import { Color } from '../../styles/variables.css';
import * as styles from './Card.css';

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
  href: string;
  entity: RegEntity;
  menus: { label: string; href: string }[];
  onCopy: () => void;
};

export const Card = ({ href, entity, menus, onCopy }: Props) => {
  const anchor = useRef<any>(null);
  const [open, setOpen] = useState(false);

  const handleMenuOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenClick = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCopyClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      const { origin, pathname } = window.location;
      await clipboard.writeText(`${origin}${pathname}?id=${entity.id}`);
      onCopy();
    },
    [entity.id, onCopy],
  );

  return (
    <div id={entity.id} className={styles.wrapper}>
      <BaseButton
        className={styles.inner}
        href={href}
        onClick={handleOpenClick}
      >
        <div className={styles.sign}>
          <Sign variant={entity.variant} />
        </div>

        <div className={styles.image}>
          <span className={styles.imageInner}>
            <Image
              lazy={true}
              src={imageSrc(entity)}
              width="100%"
              height="100%"
              fit="scale-down"
            />
          </span>
          <Transparent />
        </div>

        <div title={entity.name} className={styles.title}>
          <Ellipsis line={2}>{entity.name}</Ellipsis>
        </div>
      </BaseButton>

      <div className={styles.menu}>
        <IconButton
          ref={anchor}
          aria-owns={`${entity.id}-menu`}
          aria-label="Open menu"
          onClick={handleMenuOpen}
        >
          <MoreIcon fill={Color.TEXT_BASE} />
        </IconButton>

        <Menu
          id={`${entity.id}-menu`}
          placement="bottom-left"
          anchor={anchor}
          open={open}
          onRequestClose={handleClose}
        >
          <Menu.Item href={href} onClick={handleOpenClick}>
            Open
          </Menu.Item>

          <Menu.Item onClick={handleCopyClick}>Copy Link</Menu.Item>

          {menus.map(({ label, href }, i) => (
            <Menu.Item key={i} href={href}>
              {label}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
};
