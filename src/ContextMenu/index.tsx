import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StoresFactory, IStoresModel } from './stores';
import { AppFactory } from './controller/index';
import { Menu, Icon } from 'antd';
import { debugInteract } from '../lib/debug';
import { IMenuModel, IMenuObject } from './schema';
import styled from 'styled-components';

interface ContextMenuProps {
  /**
   * 是否展现
   */
  visible: boolean;
  menu: IMenuModel | IMenuObject;
  onClickItem?: (key: string, keyPath: Array<string>, item: any) => void;
}

interface ContextMenuState {
  // selectedId?: string;
}

const MenuWrap = styled.div`
  background: red;
`;

// 推荐使用 decorator 的方式，否则 stories 的导出会缺少 **Prop Types** 的说明
// 因为 react-docgen-typescript-loader 需要  named export 导出方式
@observer
export class ContextMenu extends Component<ContextMenuProps, ContextMenuState> {
  private root: React.RefObject<HTMLDivElement>;
  constructor(props: ContextMenuProps) {
    super(props);
    this.state = {};

    this.root = React.createRef();
  }

  onClickMenuItem = (event: any) => {
    const { onClickItem } = this.props;
    const { item, key, keyPath } = event;

    onClickItem && onClickItem(key, keyPath, item);
  };

  render() {
    const { menu, visible } = this.props;
    return (
      <MenuWrap ref={this.root} className="contextMenu">
        {(visible || null) && (
          <Menu
            className={'menuWrap'}
            onClick={this.onClickMenuItem}
            mode="vertical"
          >
            {[].concat(menu.children || []).map(item => {
              return item.isDivider ? (
                <Menu.Divider key={item.id} />
              ) : (
                <Menu.Item
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
                </Menu.Item>
              );
            })}
          </Menu>
        )}
      </MenuWrap>
    );
  }
}

/* ----------------------------------------------------
    以下是专门配合 store 时的组件版本
----------------------------------------------------- */

/**
 * 科里化创建 ContextMenuWithStore 组件
 * @param stores - store 模型实例
 */
export const ContextMenuAddStore = (stores: IStoresModel) =>
  observer(function ContextMenuWithStore(props: ContextMenuProps) {
    return <ContextMenu menu={stores.menu} {...props} />;
  });
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
