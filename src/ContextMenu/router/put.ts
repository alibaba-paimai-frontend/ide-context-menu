import Router from 'ette-router';
import { updateStylesMiddleware, updateThemeMiddleware, buildNormalResponse } from 'ide-lib-base-component';

import { IContext } from './helper';

export const router = new Router();
// 更新单项属性
router.put('updateMenu', '/menu', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { name, value } = request.data;

  //   stores.setSchema(createSchemaModel(schema));
  const originValue = stores.model[name];
  const isSuccess = stores.model.updateAttribute(name, value);

  buildNormalResponse(ctx, 200, { success: isSuccess, origin: originValue }, `属性 ${name} 的值从 ${originValue} -> ${value} 的变更: ${isSuccess}`);
});

// 更新指定节点的属性
router.put('updateItemById', '/items/:id', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { name, value } = request.data;
  const { id } = ctx.params;
  const isSuccess = stores.model.menu.updateItemById(id, name, value);
  buildNormalResponse(ctx, 200, { success: isSuccess });
});

// 更新菜单位置
router.put('updateMenuPosition', '/menu/position', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { x, y} = request.data;
  const origin = {x: stores.model.left, y: stores.model.top}
  const isSuccess = stores.model.setPostion({x, y});
  buildNormalResponse(ctx, 200, { success: isSuccess, origin });
});


// 更新 css 属性
router.put('updateStyles', '/model/styles/:target', updateStylesMiddleware('model'));


// 更新 theme 属性
router.put('updateTheme', '/model/theme/:target', updateThemeMiddleware('model'));
