import { IStoresEnv } from 'ide-lib-base-component';
import { IStoresModel } from 'ide-lib-engine';

/**
 * 显示 list 列表项
 * @param env - IStoresEnv
 */
export const selectItem = (env: IStoresEnv<IStoresModel>) => async (key: string, keyPath: Array<string>, item: any) => {
    const { stores, client } = env;
    stores.model.setSelectedKey(key);
}

