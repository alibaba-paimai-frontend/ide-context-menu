import { types, SnapshotOrInstance, Instance } from 'mobx-state-tree';
import { MenuModel, IMenuModel } from './schema/';
import { createEmptyMenuModel } from './schema/util';
import { debugInteract } from '../lib/debug';

export const Stores = types
  .model('StoresModel', {
    menu: MenuModel
  })
  .actions(self => {
    return {
      setMenu(menu: IMenuModel) {
        self.menu = menu;
      }
    };
  });

export interface IStoresModel extends Instance<typeof Stores> {}

/**
 * 工厂方法，用于创建 stores
 */
export function StoresFactory(): IStoresModel {
  return Stores.create({
    menu: createEmptyMenuModel()
  });
}
