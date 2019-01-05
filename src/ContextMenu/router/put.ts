import Router from 'ette-router';
import { getAdjustedPostion } from '../../lib/util';
export const router = new Router();

const HEIGHT_MENUITEM = 48; // 每个菜单项的高度，如果样式修改了的话，请及时更改

// 更新根节点的属性
(router as any).put('items', '/items', function(ctx: any) {
  const { stores } = ctx;
  ctx.response.body = {
    node: stores.resetToEmpty()
  };
  ctx.response.status = 200;
});

// 更新指定节点的属性
(router as any).put('items', '/items/:id', function(ctx: any) {
  const { stores, request } = ctx;
  const { name, value } = request.data;
  const { id } = ctx.params;

  //   stores.setSchema(createSchemaModel(schema));
  const isSuccess = stores.menu.updateItemById(id, name, value);
  ctx.response.body = {
    success: isSuccess
  };

  ctx.response.status = 200;
});

// 更新菜单项属性
(router as any).put('menu', '/menu', function(ctx: any) {
  const { stores, request } = ctx;
  const { name, value } = request.data;

  //   stores.setSchema(createSchemaModel(schema));
  const isSuccess = stores.updateAttribute(name, value);
  ctx.response.body = {
    success: isSuccess
  };

  ctx.response.status = 200;
});

// 更新菜单的位置
(router as any).put('menu', '/menu/position', async function(ctx: any) {
  const { stores, request } = ctx;
  const { query, data } = request;
  const { x, y } = data;
  if (query) {
    switch (query.type) {
      case 'event':
        const menuNum = stores.menu.children.length;
        const adjustedPostion = getAdjustedPostion(
          { x, y },
          { w: stores.width, h: menuNum * HEIGHT_MENUITEM }
        );
        stores.setPostion(adjustedPostion);
        ctx.response.body = {
          success: true,
          // 显示菜单的区域，高、宽、起点位置
          area: {
            ...adjustedPostion,
            w: stores.width,
            h: menuNum * HEIGHT_MENUITEM
          }
        };
        ctx.response.status = 200;
        break;

      default:
        break;
    }
  }
});
