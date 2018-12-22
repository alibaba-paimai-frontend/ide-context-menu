import {
  MenuItemModel,
  MenuModel,
  IMenuObject,
  IMenuItemObject,
  IMenuModel,
  IMenuItemModel
} from './index';
import { invariant, capitalize } from '../../lib/util';
import { debugModel } from '../../lib/debug';
import { IStoresModel } from './stores';
/**
 * 将普通对象转换成 menu Model
 * @param menu - 普通的 menu 对象
 */
export function createMenuModel(menu: IMenuObject): IMenuModel {
  invariant(!!menu, 'menu 对象不能为空');
  invariant(!!menu.name, 'menu 对象缺少 `name` 属性');

  const menuModel = MenuModel.create({
    id: menu.id,
    name: menu.name,
    children: []
  });

  // 遍历添加 menu item
  [].concat(menu.children || []).forEach((item: IMenuItemObject) => {
    const { id, name, icon, type, disabled, shortcut } = item;
    menuModel.addMenuItems(
      MenuItemModel.create({ id, name, icon, type, disabled, shortcut })
    );
  });

  //   menuModel.addMenuItems(items);

  return menuModel;
}

const MENU_EMPTY_NAME = 'EMPTY_EMNU';

/**
 * 创建新的空白
 */
export function createEmptyMenuModel() {
  return createMenuModel({ id: MENU_EMPTY_NAME, name: MENU_EMPTY_NAME });
}

/* ----------------------------------------------------
    更新指定 enum 中的属性
----------------------------------------------------- */
const update = (valueSet: string[]) => (
  item: IMenuItemModel | IStoresModel,
  attrName: string,
  value: any
): boolean => {
  invariant(!!item, '入参 item 必须存在');
  // 如果不是可更新的属性，那么将返回 false
  if (!valueSet.includes(attrName)) {
    debugModel(
      `[更新属性] 属性名 ${attrName} 不属于可更新范围，无法更新成 ${value} 值；（附:可更新属性列表：${valueSet}）`
    );
    return false;
  }

  const functionName = `set${capitalize(attrName)}`; // 比如 attrName 是 `type`, 则调用 `setType` 方法
  (item as any)[functionName](value);
  return true;
};

// 定义 menuitem 可更新信息的属性
const ITEM_EDITABLE_ATTRIBUTE = [
  'name',
  'type',
  'disabled',
  'icon',
  'shortcut'
];

export const updateItem = update(ITEM_EDITABLE_ATTRIBUTE);

// 定义 menu 可更新信息的属性
const MENU_EDITABLE_ATTRIBUTE = ['visible', 'width', 'left', 'top'];

export const updateMenuContainer = update(MENU_EDITABLE_ATTRIBUTE);
// ==============================
