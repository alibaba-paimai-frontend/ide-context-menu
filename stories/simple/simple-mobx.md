
### 使用说明

通过 `createMenuModel` 方法将普通对象转换成 mobx 对象：
```js

const menuNormalModel = createMenuModel({
    id: 'component-tree',
    name: '组件树右键菜单',
    children: [
      { id: 'newFile', name: '创建新页面', icon: 'file' },
      { id: 'copy', name: '复制', icon: 'copy', shortcut: '⌘+C' },
      { id: 'paste', name: '粘贴', icon: 'switcher', shortcut: '⌘+V' },
      {
        id: 'divider',
        name: '分割线',
        icon: 'file',
        type: 'separator'
      },
      { id: 'preview', name: '预览', icon: 'eye' },
      { id: 'delete', name: '删除', icon: 'delete', shortcut: '⌘+Delete' }
    ]
  });
```

将该 schema 传给 `ContextMenu` 组件即可。
```js
<ContextMenu
    visible={true}
    menu={menuNormalModel}
    width={200}
    left={100}
    top={100}
    onClickItem={onClickItem}
  />
```

因为是 mobx 对象，当我们更改其中的属性后属性将会生效；



