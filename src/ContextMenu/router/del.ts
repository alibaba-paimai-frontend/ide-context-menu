import Router from 'ette-router';
import { buildNormalResponse } from 'ide-lib-base-component';

import { IContext } from './helper';

export const router = new Router();

// 移除操作
router.del('resetModel', '/menu', function (ctx: IContext) {
  const { stores } = ctx;
  buildNormalResponse(ctx, 200, { node: stores.resetToEmpty()})
});

// 移除指定节点
router.del('removeItemById', '/items/:id', function (ctx: IContext) {
  const { stores, params } = ctx;
  const { id } = params;
  // 这里有个特殊情况，如果 id 是根节点的 id，需要调用 `resetToEmpty` 方法
  const result = stores.model.menu.removeItem(id);
  buildNormalResponse(ctx, 200, { item: result })
});