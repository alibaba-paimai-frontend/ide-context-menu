import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Input, Button } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdDelNode from './delNode.md';

import { ContextMenuFactory } from '../../../src';
import { menuGen } from '../../helper';

const { ContextMenuWithStore, client } = ContextMenuFactory();

function onClickItem(key, keyPath, item) {
  console.log(`当前点击项的 id: ${key}`);
}

const styles = {
  demoWrap: {
    display: 'flex',
    width: '100%'
  }
};

function createNew() {
  const menu = menuGen();
  client.post('/menu', { menu: menu });
  client.put('/menu', { name: 'visible', value: true }); // 让菜单可见

}

function resetMenu() {
  client.del('/menu');
}

function removeItemById() {
  const id = document.getElementById('itemId').value;
  if (!id) {
    document.getElementById('info').innerText = '请输入 id';
    return;
  }

  // 移除指定节点
  client.del(`/items/${id}`).then(res => {
    const { status, body } = res;
    if (status === 200) {
      const item = body.item || {};
      document.getElementById('info').innerText =
        `被删除 item 信息：\n` + JSON.stringify(item, null, 4);
      // 同时选中父节点
    }
  });
}
storiesOf('API - del', module)
  .addParameters(wInfo(mdDelNode))
  .addWithJSX('/items/:id 移除指定菜单项', () => {
    return (
      <Row style={styles.demoWrap}>
        <Col span={10} offset={4}>
          <Row>
            <Col span={4}>
              <Input placeholder="菜单项 ID" id="itemId" />
            </Col>
            <Col span={20}>
              <Button onClick={removeItemById}>移除节点</Button>
              <Button onClick={resetMenu}>重置成空树</Button>
              <Button onClick={createNew}>创建随机树</Button>
            </Col>
          </Row>

          <ContextMenuWithStore onClickItem={onClickItem}/>
        </Col>
        <Col span={12}>
          <div id="info" />
        </Col>
      </Row>
    );
  });
