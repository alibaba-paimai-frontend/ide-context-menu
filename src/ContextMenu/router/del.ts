import Router from 'ette-router';
import { areaCache, IContext } from './helper';
export const router = new Router();

// 移除整棵树
router.del('menu', '/menu', function(ctx: IContext) {
  const { stores } = ctx;
  ctx.response.body = {
    menu: stores.resetToEmpty()
  };
  ctx.response.status = 200;
});

// 移除指定节点
router.del('items', '/items/:id', function(ctx: IContext) {
  const { stores, params } = ctx;
  const { id } = params;
  // 这里有个特殊情况，如果 id 是根节点的 id，需要调用 `resetToEmpty` 方法
  const result = stores.menu.removeItem(id);
  ctx.response.body = {
    item: result
  };
  ctx.response.status = 200;
});

// 删除等待关闭区域
router.del('menu', '/menu/bufferAreas', function(ctx: IContext) {
  const { stores } = ctx;
  ctx.response.body = {
    result: areaCache.delete(stores.id)
  };
  ctx.response.status = 200;
});
