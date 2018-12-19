import Router from 'ette-router';
export const router = new Router();

// 更新根节点的属性
(router as any).put('nodes', '/nodes/root', function(ctx: any) {
  const { stores } = ctx;
  ctx.response.body = {
    node: stores.resetToEmpty()
  };
  ctx.response.status = 200;
});
