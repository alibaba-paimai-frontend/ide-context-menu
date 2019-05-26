import { types } from 'mobx-state-tree';
import { BASE_CONTROLLED_KEYS } from 'ide-lib-base-component';

import { IStoresModel, IModuleConfig } from 'ide-lib-engine';
import { DEFAULT_PROPS, IContextMenuProps } from '.';
import { selectItem } from './solution';

import { subComponents, ISubProps } from './subs';
import { modelExtends, MenuModel } from './model';

import { router as GetRouter } from './router/get';
import { router as PostRouter } from './router/post';
import { router as PutRouter } from './router/put';
import { router as DelRouter } from './router/del';

export const configContextMenu: IModuleConfig<IContextMenuProps, ISubProps> = {
  component: {
    className: 'ContextMenu',
    solution: {
      onClickItem: [selectItem]
    },
    defaultProps: DEFAULT_PROPS,
    children: subComponents
  },
  router: {
    domain: 'context-menu',
    list: [GetRouter, PostRouter, PutRouter, DelRouter],
  },
  store: {
    idPrefix: 'scm'
  },
  model: {
    controlledKeys: [], // 后续再初始化
    props: {
      menu: MenuModel,
      selectedKey: types.optional(types.string, ''), // 被点击的 item
      visible: types.optional(types.boolean, false),
      width: types.optional(types.number, 200),
      left: types.optional(types.number, 0),
      top: types.optional(types.number, 0)
      // language: types.optional(
      //   types.enumeration('Type', CODE_LANGUAGES),
      //   ECodeLanguage.JS
      // ),
      // children: types.array(types.late((): IAnyModelType => SchemaModel)) // 在 mst v3 中， `types.array` 默认值就是 `[]`
      // options: types.map(types.union(types.boolean, types.string))
      // 在 mst v3 中， `types.map` 默认值就是 `{}`
    },
    extends: modelExtends
  },
};

// 枚举受 store 控制的 key，一般来自 config.model.props 中 key
// 当然也可以自己枚举
export const SELF_CONTROLLED_KEYS = Object.keys(configContextMenu.model.props); // ['visible', 'text']

export const CONTROLLED_KEYS = BASE_CONTROLLED_KEYS.concat(
  SELF_CONTROLLED_KEYS
);

// 初始化 controlledKeys
configContextMenu.model.controlledKeys = CONTROLLED_KEYS;
