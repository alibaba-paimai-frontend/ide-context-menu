import { types, SnapshotOrInstance, Instance } from 'mobx-state-tree';
import { MenuModel, IMenuModel } from './index';
import { createEmptyMenuModel, updateMenuContainer } from './util';
import { debugInteract } from '../../lib/debug';
import { isExist, invariant, isTrue } from '../../lib/util';

interface IPosition {
  x?: number;
  y?: number;
}
export const Stores = types
  .model('StoresModel', {
    menu: MenuModel,
    visible: false,
    width: types.optional(types.number, 200),
    left: types.optional(types.number, 0),
    top: types.optional(types.number, 0)
  })
  .actions(self => {
    return {
      setVisible(visible: boolean) {
        self.visible = isTrue(visible);
      },
      setWidth(width: number) {
        self.width = +width;
      },
      setLeft(x: number) {
        self.left = +x;
      },
      setTop(y: number) {
        self.top = +y;
      },
      setMenu(menu: IMenuModel) {
        self.menu = menu;
      }
    };
  })
  .actions(self => {
    return {
      /**
       * 更新位置
       * 影响属性：left, top
       * @param position {x?,y?} 位置属性
       */
      setPostion(position: IPosition) {
        if (!position) return;
        const { x, y } = position;
        if (isExist(x)) {
          self.setLeft(x);
        }
        if (isExist(y)) {
          self.setTop(y);
        }
      },
      /**
       * 更新菜单的属性
       * @param name - 要更新的属性名
       * @param value - 要更新的属性值
       */
      updateAttribute(attrName: string, value: any) {
        invariant(isExist(name), '[属性更新] 入参 attrName 不能为空');

        return updateMenuContainer(self as IStoresModel, attrName, value);
      }
    };
  })
  .actions(self => {
    return {
      /**
       * 重置 menu，相当于创建空树
       * 影响范围：整棵树
       */
      resetToEmpty() {
        const menuToRemoved = (self.menu as any).toJSON();
        self.setMenu(createEmptyMenuModel());
        self.setVisible(false);
        self.setPostion({x:0, y:0});
        return menuToRemoved;
      }
    };
  });

export interface IStoresModel extends Instance<typeof Stores> {}

/**
 * 工厂方法，用于创建 stores
 */
export function StoresFactory(): IStoresModel {
  return Stores.create({
    menu: createEmptyMenuModel(),
    visible: false,
    left: 0,
    top: 0
  });
}
