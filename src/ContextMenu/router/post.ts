import Router from 'ette-router';

export const router = new Router();

// 获取所有的节点
(router as any).post('nodes', '/nodes', function(ctx: any) {
  const { stores } = ctx;
  ctx.response.body = {
    node: stores.resetToEmpty()
  };
  ctx.response.status = 200;
});
