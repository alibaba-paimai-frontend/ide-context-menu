import { IStoresEnv, ISizeArea } from 'ide-lib-base-component';
import { IStoresModel } from 'ide-lib-engine';
import { debugRender } from '../../../lib/debug';

/**
 * 显示 list 列表项
 * @param env - IStoresEnv
 */
export const onChangeSize = (env: IStoresEnv<IStoresModel>) => async (
  size: ISizeArea['size']
) => {
  const { client } = env;
  debugRender('[onChangeSize] context menu size: ', size);
  client.put('/csize', size);
};
