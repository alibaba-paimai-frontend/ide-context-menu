import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Menu, Icon } from 'antd';

import {
  StoresFactory,
  IStoresModel,
  TStoresControlledKeys,
  STORES_CONTROLLED_KEYS
} from './schema/stores';
import { AppFactory } from './controller/index';
import { debugInteract } from '../lib/debug';
import { pick } from '../lib/util';
import { IMenuModel, IMenuObject, EMenuItemType } from './schema';
import { MenuContainer, StyledMenu, StyledMenuItem } from './styles';

export interface IContextMenuEvent {
  /**
   * 点击菜单条目的回调函数
   */
  onClickItem?: (key: string, keyPath: Array<string>, item: any) => void;
}

interface IMenuProps extends IContextMenuEvent {
  /**
   * 菜单项对象
   */
  menu: IMenuModel | IMenuObject;

  /**
   * 菜单宽度
   */
  width?: number;
}

export interface IContextMenuProps extends IMenuProps {
  /**
   * 是否展现
   */
  visible: boolean;

  /**
   * 菜单距左边距离（fix定位）
   */
  left?: number;

  /**
   * 菜单距顶部距离（fix定位）
   */
  top?: number;
}

@observer
class MenuSubject extends Component<IMenuProps> {
  static displayName = 'MenuSubject';
  constructor(props: IContextMenuProps) {
    super(props);
    this.state = {};
  }

  onClickMenuItem = (event: any) => {
    const { onClickItem } = this.props;
    const { item, key, keyPath } = event;

    debugInteract(`[点击菜单]key: ${key}; keyPath: ${keyPath}; item:`, item);
    onClickItem && onClickItem(key, keyPath, item);
  };

  render() {
    const { menu, width } = this.props;
    const { children = [] } = menu;
    return (
      <StyledMenu
        width={width}
        className={'menuWrap'}
        onClick={this.onClickMenuItem}
        mode="vertical"
      >
        {(children as any).slice().map((item: any) => {
          const isDivider =
            item.isDivider || item.type === EMenuItemType.SEPARATOR;
          return isDivider ? (
            <Menu.Divider key={item.id} />
          ) : (
            <StyledMenuItem
              className={'menuItem'}
              disabled={item.disabled}
              key={item.id}
            >
              <div className={'content'}>
                {item.icon ? <Icon type={item.icon} /> : null}
                <span>{item.name}</span>
              </div>
              {item.shortcut ? (
                <span className={'shortcut'}>{item.shortcut}</span>
              ) : null}
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    );
  }
}

// 推荐使用 decorator 的方式，否则 stories 的导出会缺少 **Prop Types** 的说明
// 因为 react-docgen-typescript-loader 需要  named export 导出方式
@observer
export class ContextMenu extends Component<IContextMenuProps> {
  static displayName = 'ContextMenu';
  private root: React.RefObject<HTMLDivElement>;
  constructor(props: IContextMenuProps) {
    super(props);
    this.state = {};

    this.root = React.createRef();
  }
  render() {
    const { menu, visible, width, left, top, onClickItem } = this.props;
    return (
      <MenuContainer
        left={left}
        top={top}
        ref={this.root}
        className="contextMenu-container"
      >
        {(visible || null) && (
          <MenuSubject width={width} menu={menu} onClickItem={onClickItem} />
        )}
      </MenuContainer>
    );
  }
}

/* ----------------------------------------------------
    以下是专门配合 store 时的组件版本
----------------------------------------------------- */
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

/**
 * 科里化创建 ContextMenuWithStore 组件
 * @param stores - store 模型实例
 */
export const ContextMenuAddStore = (stores: IStoresModel) => {
  function ContextMenuWithStore(
    props: Omit<IContextMenuProps, TStoresControlledKeys>
  ) {
    const { onClickItem, ...otherProps } = props;
    const controlledProps = pick(stores, STORES_CONTROLLED_KEYS);
    return <ContextMenu {...controlledProps} {...otherProps} />;
  }
  ContextMenuWithStore.displayName = 'ContextMenuWithStore';

  return observer(ContextMenuWithStore);
};

/**
 * 工厂函数，每调用一次就获取一副 MVC
 * 用于隔离不同的 ContextMenuWithStore 的上下文
 */
export const ContextMenuFactory = () => {
  const stores = StoresFactory(); // 创建 model
  const app = AppFactory(stores); // 创建 controller，并挂载 model
  return {
    stores,
    app,
    client: app.client,
    ContextMenuWithStore: ContextMenuAddStore(stores)
  };
};
