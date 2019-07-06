import * as React from 'react';
import { render } from 'react-dom';
import {
  ContextMenu,
  ContextMenuFactory,
  IMenuObject,
  IContextMenuProps
} from '../src/';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

const {
  ComponentWithStore: ContextMenuWithStore,
  client
} = ContextMenuFactory();

const menu: IMenuObject = {
  id: 'component-tree',
  name: '组件树右键菜单',
  children: [
    { id: 'newFile', name: '创建新页面', icon: 'file' },
    { id: 'copy', name: '复制', icon: 'copy', shortcut: '⌘+C' },
    {
      id: 'paste',
      name: '粘贴',
      icon: 'switcher',
      shortcut: '⌘+V',
      disabled: true
    },
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

function onClickItem(key: string, keyPath: Array<string>, item: any) {
  console.log(`当前点击项的 id: ${key}`);
  client.get('/selection').then(res => {
    console.log('get /selection:', res.body);
  });
}

render(
  <Collapse defaultActiveKey={['1']}>
    <Panel header="普通组件" key="0">
      <ContextMenu
        visible={true}
        menu={menu}
        cWidth={200}
        left={100}
        top={100}
        onClickItem={onClickItem}
      />
    </Panel>
    <Panel header="包含 store 功能" key="1">
      <ContextMenuWithStore onClickItem={onClickItem} />
    </Panel>
  </Collapse>,
  document.getElementById('example') as HTMLElement
);

client.post('/model', {
  model: {
    visible: true,
    text: `text${Math.random()}`.slice(0, 8)
  }
});

client.post('/menu', { menu: menu });
client.put('/menu', { name: 'visible', value: false }); // 让菜单可见
client.put('/menu', { name: 'top', value: 500 }); // 更改位置

setTimeout(() => {
  client.put('/menu', { name: 'visible', value: true }).then(() => {
    client.get('/csize').then(res => {
      console.log('menu size:', res.body.data);
    });
    // 自动变更 position 位置
    client.put('/menu/position', {
      x: 300,
      y: 800,
    });
  }); // 让菜单可见
}, 1000);
