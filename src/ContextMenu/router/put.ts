import Router from 'ette-router';
export const router = new Router();

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
