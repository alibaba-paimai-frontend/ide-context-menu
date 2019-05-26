import React from 'react';
import { storiesOf } from '@storybook/react';

import { createModel } from 'ide-lib-engine';

import { wInfo } from '../../.storybook/utils';

import { ContextMenu, ContextMenuModel } from '../../src/';
import { menuNormalGen } from '../helper';

import mdMobx from './simple-mobx.md';
import mdPlain from './simple-plain.md';

const menuNormal = menuNormalGen();
const menuNormalModel = createModel(ContextMenuModel, {
  visible: true,
  menu: menuNormal,
  left: 200, 
  top: 100, 
  width: 200
});
// console.log(444, menuNormalModel);
function onClickItem(key, keyPath, item) {
  console.log(`当前点击项的 id: ${key}`);
}

const clickBtn = () => {
  menuNormal.name = 'hello';
};

const clickWithStore = () => {
  menuNormalModel.menu.children[0].setName('hello');
};

storiesOf('基础使用', module)
  .addParameters(wInfo(mdMobx))
  .addWithJSX('使用 mobx 对象', () => (
    <div>
      <ContextMenu
        {...menuNormalModel}
        onClickItem={onClickItem}
      />
      <button onClick={clickWithStore}>
        更换首个 item 的 name （会响应）
      </button>
    </div>
  ))
  .addParameters(wInfo(mdPlain))
  .addWithJSX('普通 menu 对象', () => (
    <div>
      <ContextMenu
        visible={true}
        menu={menuNormal}
        width={200}
        left={400}
        top={100}
        onClickItem={onClickItem}
      />
      <button onClick={clickBtn}>
        更换首个 item 的 name （不会响应）
      </button>
    </div>
  ));
