import Router from 'ette-router';
import { IContext } from './helper';

export const router = new Router();

// 默认获取所有的节点，可以通过 filter 返回指定的属性值
// 比如 /nodes?filter=name,screenId ，返回的集合只有这两个属性
router.get('getAllItems', '/items', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { query } = request;
  const filterArray = query && query.filter && query.filter.trim().split(',');
  ctx.response.body = {
    items: stores.menu.allItemsWithFilter(filterArray)
  };
  ctx.response.status = 200;
});

// 返回某个节点的 schema 信息
router.get('getItemById', '/items/:id', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { query } = request;
  const { id } = ctx.params;
  const filterArray = query && query.filter && query.filter.trim().split(',');
  ctx.response.body = {
    item: stores.menu.findItem(id, filterArray)
  };
  ctx.response.status = 200;
});


/**
 * 返回之前被点击的 key 值
 */
router.get('getSelectedKey', '/selection', function(ctx: IContext) {
  const { stores, request } = ctx;
  ctx.response.body = {
    selection: stores.selectedKey
  };
  ctx.response.status = 200;
});
