import Router from 'ette-router';
import {  buildNormalResponse } from 'ide-lib-base-component';
import { pick } from 'ide-lib-utils';


import { IContext } from './helper';

export const router = new Router();

// 可以通过 filter 返回指定的属性值
// 比如 /nodes?filter=name,screenId ，返回的集合只有这两个属性
router.get('getModelInstance', '/model', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { query } = request;
  const filterArray = query && query.filter && query.filter.trim().split(',');
  buildNormalResponse(ctx, 200, { attributes: stores.model.allAttibuteWithFilter(filterArray) });
});

// 获取上下文菜单所有的 items
router.get('getAllItems', '/items', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { query } = request;
  const filterArray = query && query.filter && query.filter.trim().split(',');
  const meunItems = stores.model.menu.children;
  buildNormalResponse(ctx, 200, { items: meunItems.map((node: any) => pick(node, filterArray))});
});

// 返回某个节点的 schema 信息
router.get('getItemById', '/items/:id', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { query } = request;
  const { id } = ctx.params;
  const filterArray = query && query.filter && query.filter.trim().split(',');
  buildNormalResponse(ctx, 200, { item: stores.model.menu.findItem(id, filterArray) });
});

/**
 * 返回之前被点击的 key 值
 */
router.get('getSelectedKey', '/selection', function (ctx: IContext) {
  const { stores } = ctx;
  buildNormalResponse(ctx, 200, { selection: stores.model.selectedKey});
});

