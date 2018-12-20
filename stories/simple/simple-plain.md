## 使用说明


也可以直接传递普通 menu 对象：：

```js
const menuNormal = {
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
  };
```

传递普通对象数据的话，就没有了 mobx 的自动响应变化的能力了。

```js
<ContextMenu
        visible={true}
        menu={menuNormal}
        width={200}
        left={100}
        top={100}
        onClickItem={onClickItem}
      />
```

