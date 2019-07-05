import { IStoresEnv, ISizeArea } from 'ide-lib-base-component';
import { IStoresModel } from 'ide-lib-engine';

/**
 * 显示 list 列表项
 * @param env - IStoresEnv
 */
export const onChangeSize = (env: IStoresEnv<IStoresModel>) => async (
  size: ISizeArea['size']
) => {
  const { client } = env;
  client.put('/csize', size);
};
