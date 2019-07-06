import Router from 'ette-router';
import {
  updateStylesMiddleware,
  updateThemeMiddleware,
  buildNormalResponse
} from 'ide-lib-base-component';

import { IContext } from './helper';
import { debugInteract } from '../../lib/debug';

export const router = new Router();
// 更新单项属性
router.put('updateMenu', '/menu', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { name, value } = request.data;

  //   stores.setSchema(createSchemaModel(schema));
  const originValue = stores.model[name];
  const isSuccess = stores.model.updateAttribute(name, value);

  buildNormalResponse(
    ctx,
    200,
    { success: isSuccess, origin: originValue },
    `属性 ${name} 的值从 ${originValue} -> ${value} 的变更: ${isSuccess}`
  );
});

// 更新指定节点的属性
router.put('updateItemById', '/items/:id', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { name, value } = request.data;
  const { id } = ctx.params;
  const isSuccess = stores.model.menu.updateItemById(id, name, value);
  buildNormalResponse(ctx, 200, { success: isSuccess });
});

const bias = 10;

// 更新菜单位置
router.put('updateMenuPosition', '/menu/position', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { x, y, auto = true } = request.data;
  const origin = { x: stores.model.left, y: stores.model.top };

  const { cWidth, cHeight } = stores.model;

  const targetPlace = { x, y };

  let autoLayout = false;

  // 如果采用自适应布局，auto = true 的情况，需要计算当前菜单位置在窗口的位置
  if (auto && !isNaN(cWidth) && !isNaN(cHeight)) {
    // 获取组件尺寸
    // 获取窗口尺寸
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    autoLayout = true;

    // 判断防止在点击处的右边
    const placeRight = cWidth + x < screenW;
    // 是否放在点击下方
    const placeUnder = cHeight + y < screenH;

    if (placeRight) {
      targetPlace.x = x + bias;
    } else {
      targetPlace.x = x - cWidth - bias;
    }

    if (placeUnder) {
      targetPlace.y = y + bias;
    } else {
      targetPlace.y = y - cHeight - bias;
    }
    debugInteract(
      `[右键菜单]输入位置（${x}, ${y}）\n当前屏幕尺寸（${screenW}, ${screenH}）\n 菜单尺寸（${cWidth}, ${cHeight}）\n计算位置 placeRight: ${placeRight},placeUnder: ${placeUnder}`
    );
  }

  const isSuccess = stores.model.setPostion(targetPlace);
  buildNormalResponse(
    ctx,
    200,
    {
      success: isSuccess,
      autoLayout,
      origin,
      target: targetPlace
    },
    `菜单位置变更: ${JSON.stringify(origin)} --> ${JSON.stringify(targetPlace)}`
  );
});

// 更新菜单尺寸
router.put('updateCSize', '/csize', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { width, height } = request.data;
  const origin = { width: stores.model.cWidth, height: stores.model.cHeight };
  stores.model.setCWidth(width);
  stores.model.setCHeight(height);
  buildNormalResponse(ctx, 200, { success: true, origin });
});

// 更新 css 属性
router.put(
  'updateStyles',
  '/model/styles/:target',
  updateStylesMiddleware('model')
);

// 更新 theme 属性
router.put(
  'updateTheme',
  '/model/theme/:target',
  updateThemeMiddleware('model')
);
