import Router from 'ette-router';
export const router = new Router();

// 移除整棵树
(router as any).del('menu', '/menu', function(ctx: any) {
  const { stores } = ctx;
  ctx.response.body = {
    menu: stores.resetToEmpty()
  };
  ctx.response.status = 200;
});

// 移除指定节点
(router as any).del('items', '/items/:id', function(ctx: any) {
  const { stores, params } = ctx;
  const { id } = params;
  // 这里有个特殊情况，如果 id 是根节点的 id，需要调用 `resetToEmpty` 方法
  const result = stores.menu.removeItem(id);
  ctx.response.body = {
    item: result
  };
  ctx.response.status = 200;
});
