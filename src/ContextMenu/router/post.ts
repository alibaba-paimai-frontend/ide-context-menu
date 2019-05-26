import Router from 'ette-router';
import { buildNormalResponse } from 'ide-lib-base-component';
import { createModel } from 'ide-lib-engine';

import { IContext } from './helper';
import { ContextMenuModel } from '../../index';


export const router = new Router();

// 创新新的 model 
router.post('createModel', '/model', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { model } = request.data;

  stores.setModel(createModel(ContextMenuModel, model));

  buildNormalResponse(ctx, 200, { success: true });
});

// 创建新的菜单
router.post('createMenu', '/menu', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { menu } = request.data;
  stores.model.setMenu(menu);
  buildNormalResponse(ctx, 200, { success: true });
});
