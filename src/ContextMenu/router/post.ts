import Router from 'ette-router';
import { createMenuModel } from '../schema/util';
export const router = new Router();

// 创建新的菜单
(router as any).post('menu', '/menu', function(ctx: any) {
  const { stores, request } = ctx;
  const { menu } = request.data;
  stores.setMenu(menu);
  ctx.response.status = 200;
});
