import React, { useRef, useEffect } from 'react';
import { Button } from 'antd';
import {
  IBaseTheme,
  IBaseComponentProps,
  IBaseComponentEvent,
  useSizeChange
} from 'ide-lib-base-component';

import { TComponentCurrying } from 'ide-lib-engine';

import {
  MenuSubject,
  IMenuSubjectEvent,
  IMenuSubjectProps
} from './mods/MenuSubject';
import { MenuContainer } from './styles';
import { ISubProps } from './subs';

export * from './mods/MenuSubject';

export interface IContextMenuEvent
  extends IMenuSubjectEvent,
    IBaseComponentEvent {}

// export interface IContextMenuStyles extends IBaseStyles {
//   container?: React.CSSProperties;
// }

export interface IContextMenuTheme extends IBaseTheme {
  main: string;
}

export interface IContextMenuProps
  extends IMenuSubjectProps,
    ISubProps,
    IBaseComponentProps {
  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * 菜单距左边距离（fix定位）
   */
  left?: number;

  /**
   * 菜单距顶部距离（fix定位）
   */
  top?: number;
}

export const DEFAULT_PROPS: IContextMenuProps = {
  menu: {
    id: 'root',
    name: 'empty menu'
  },
  visible: false,
  left: 0,
  top: 0
};

export const ContextMenuCurrying: TComponentCurrying<
  IContextMenuProps,
  ISubProps
> = subComponents => props => {
  const {
    menu,
    visible,
    cWidth,
    left,
    top,
    onClickItem,
    onCSizeChange
  } = props;

  // 对容器注册尺寸响应回调
  let refContainer = useRef(null);
  useSizeChange(refContainer, onCSizeChange);

  return (
    <MenuContainer
      ref={refContainer}
      visible={visible}
      left={left}
      top={top}
      className="context-menu-container"
    >
      <MenuSubject width={cWidth} menu={menu} onClickItem={onClickItem} />
    </MenuContainer>
  );
};
