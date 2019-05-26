import { Instance } from 'mobx-state-tree';
import { initSuitsFromConfig } from 'ide-lib-engine';

export * from './ContextMenu/config';
export * from './ContextMenu/';

import { ContextMenuCurrying } from './ContextMenu/';
import { configContextMenu } from './ContextMenu/config';

const {
    ComponentModel: ContextMenuModel,
    StoresModel: ContextMenuStoresModel,
    NormalComponent: ContextMenu,
    ComponentHOC: ContextMenuHOC,
    ComponentAddStore: ContextMenuAddStore,
    ComponentFactory: ContextMenuFactory
} = initSuitsFromConfig(ContextMenuCurrying,configContextMenu);

export {
    ContextMenuModel,
    ContextMenuStoresModel,
    ContextMenu,
    ContextMenuHOC,
    ContextMenuAddStore,
    ContextMenuFactory
};

export interface IContextMenuModel extends Instance<typeof ContextMenuModel> { }
