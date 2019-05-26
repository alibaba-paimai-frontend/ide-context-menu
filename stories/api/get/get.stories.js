import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Input, Button } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdGetNode from './get.md';

import { ContextMenuFactory } from '../../../src';
import { menuGen } from '../../helper';

function onClickItem(key, keyPath, item) {
  console.log(`当前点击项的 id: ${key}`);
}
const {
  ComponentWithStore: ContextMenuWithStore1,
  client: client1
} = ContextMenuFactory();
const {
  ComponentWithStore: ContextMenuWithStore2,
  client: client2
} = ContextMenuFactory();

const styles = {
  demoWrap: {
    display: 'flex',
    width: '100%'
  }
};

let items = [];

const getInfo = client => () => {
  client.get('/items?filter=id,name').then(res => {
    const { status, body } = res;
    if (status === 200) {
      items = body.data.items;
    }
    document.getElementById('info').innerText = JSON.stringify(items, null, 4);
  });
};

const createNew = client => () => {
  const menu = menuGen();
  client.post('/menu', { menu: menu });
  client.put('/menu', {name: 'visible', value: true}); // 让菜单可见
};

const getById = client => () => {
  const id = document.getElementById('menuId').value;
  client.get(`/items/${id}`).then(res => {
    const { status, body } = res;
    if (status === 200) {
      const item = body.data.item || {};
      document.getElementById('info').innerText = JSON.stringify(
        item.toJSON ? item.toJSON() : item,
        null,
        4
      );
    }
  });
};

storiesOf('API - get', module)
  .addParameters(wInfo(mdGetNode))
  .addWithJSX('/items 获取所有菜单项', () => {
    return (
      <Row style={styles.demoWrap}>
        <Col span={10} offset={2}>
          <Button onClick={getInfo(client1)}>
            获取所有菜单信息（id, name)
          </Button>
          <Button onClick={createNew(client1)}>创建随机菜单</Button>

          <ContextMenuWithStore1 onClickItem={onClickItem} />
        </Col>
        <Col span={12}>
          <div id="info" />
        </Col>
      </Row>
    );
  }).addWithJSX('/items/:id 获取指定 id 的菜单项信息', () => {
  return (
    <Row style={styles.demoWrap}>
      <Col span={10} offset={2}>
        <Input
          placeholder="输入菜单项 ID"
          id="menuId"
          addonAfter={
            <>
              <Button onClick={getById(client2)}>通过 id 获取菜单信息</Button>
              <Button onClick={createNew(client2)}>创建随机菜单</Button>
            </>
          }
        />
        <ContextMenuWithStore2 onClickItem={onClickItem}/>
      </Col>
      <Col span={12}>
        <div id="info" />
      </Col>
    </Row>
  );
});
