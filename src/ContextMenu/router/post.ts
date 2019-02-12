import Router from 'ette-router';
import { areaCache, IContext } from './helper';
export const router = new Router();

// 创建新的菜单
router.post('menu', '/menu', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { menu } = request.data;
  stores.setMenu(menu);
  ctx.response.status = 200;
});

// 创建新的等待关闭区域
router.post('menu', '/menu/bufferAreas', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { area } = request.data;
  areaCache.set(stores.id, {
    stores,
    area
  });
  ctx.response.status = 200;
});
