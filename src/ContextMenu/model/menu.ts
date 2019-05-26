import {
    destroy,
    types,
    Instance,
    IAnyModelType,
    SnapshotOrInstance
} from 'mobx-state-tree';

import { quickInitModel } from 'ide-lib-engine';
import { pick, invariant, isExist } from 'ide-lib-utils';

import { debugModel } from '../../lib/debug';


import { MENU_TYPES, EMenuItemType, IMenuItemProps } from '../mods/MenuSubject/index';



/* ----------------------------------------------------
    MenuItemModel
----------------------------------------------------- */
export const MenuItemModel: IAnyModelType = quickInitModel(
    'MenuItemModel',
    {
        id: types.optional(types.string, ''),
        name: types.optional(types.string, ''),
        // sep 表示分割线
        type: types.optional(
            types.enumeration('Type', MENU_TYPES),
            EMenuItemType.NORMAL
        ),

        disabled: types.optional(types.boolean, false), // 是否可点击

        // 图标名，参考https://ant.design/components/icon-cn/
        icon: types.optional(types.string, ''),

        // 快捷键设置
        shortcut: types.optional(types.string, '') // 快捷键
    }
).views(self => {
    return {
        get isDivider() {
            return this.type === EMenuItemType.SEPARATOR;
        }
    };
});

export interface IMenuItemModel extends Instance<typeof MenuItemModel> { }



/* ----------------------------------------------------
    MenuModel
----------------------------------------------------- */
export const MenuModel: IAnyModelType = quickInitModel(
    'MenuModel',{
        id: types.optional(types.string, ''),
        name: types.optional(types.string, ''),
        children: types.array(types.late((): IAnyModelType => MenuItemModel)) // 在 mst v3 中， `types.array` 默认值就是 `[]
    }).views(self => {
        return {
            /**
             * 根据节点 id 找到到子 menuItem 实例
             */
            findItem(id: string, filterArray?: string | string[]) {
                if (!id) return null;

                let targetItem = null;
                const filters = [].concat(filterArray || []); // 使用逗号隔开

                self.children.some((item: IMenuItemModel) => {
                    if (item.id === id) {
                        targetItem = filters.length ? pick(item, filters) : item;
                        return true;
                    }
                    return false;
                });

                return targetItem;
            }
        }

    }).actions(self => {
        return {
            /**
             * 批量更新指定 ids 的 disabled 状态值
             * 影响属性：菜单项中的 disabled 属性
             * @param ids  - 想要批量更新的 id 列表
             * @param isDisabled - 期望更新的值
             */
            setDisabledByIds(ids: string[], isDisabled: boolean) {
                if (ids && ids.length) {
                    self.children.forEach((item: IMenuItemModel) => {
                        if (!!~ids.indexOf(item.id)) {
                            item.setDisabled(isDisabled);
                        }
                    });
                }
            },

            addMenuItems(items: IMenuItemModel | IMenuItemModel[]) {
                [].concat(items).forEach((item: IMenuItemModel) => {
                    self.children.push(item);
                });
            },

            updateItemById(id: string, attrName: string, value: string) {
                invariant(isExist(id), '菜单项 id 不能为空');
                invariant(isExist(attrName), '[属性更新] 入参 attrName 不能为空');
                debugModel(
                    `[menu][更新属性] 将更新 id: ${id} 的属性 ${attrName} 值为 ${value}`
                );

                const item = self.findItem(id);
                if (!!item) {
                    return item.updateAttribute(attrName, value);
                }

                return false;
            }
        };
    }).actions(self => {
        return {
            /**
             * 删除节点
             * 影响属性：children
             */
            removeItem: (id: string): false | IMenuItemProps => {
                if (!id) return false;
                const item = self.findItem(id); // 找到指定的节点
                if (item) {
                    const itemTobeRemove = (item as any).toJSON();
                    destroy(item as IMenuItemModel); // 从 mst 中移除节点
                    return itemTobeRemove;
                }
                return false;
            }
        };
    });;
export interface IMenuModel extends Instance<typeof MenuModel> { }
