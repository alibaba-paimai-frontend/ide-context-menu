import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Input, Button, Select } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdPutNode from './putNode.md';

import { ContextMenuFactory } from '../../../src';
import { menuGen } from '../../helper';

const { ContextMenuWithStore, client } = ContextMenuFactory();

function onClickItem(key, keyPath, item) {
  console.log(`当前点击项的 id: ${key}`);
}

const { Option } = Select;
const styles = {
  demoWrap: {
    display: 'flex',
    width: '100%'
  }
};

let selectedAttrName = '';

function createNew() {
  const menu = menuGen();
  client.post('/menu', { menu: menu });
  client.put('/menu', { name: 'visible', value: true }); // 让菜单可见
}

const updateMenuAttr = () => {
  if (!selectedAttrName) {
    document.getElementById('info').innerText = '请选择要更改的属性';
    return;
  }
  const value = document.getElementById('targeValue').value;

  client.put('/menu', { name: selectedAttrName, value: value })
};

function handleChange(value) {
  console.log(`selected ${value}`);
  selectedAttrName = value;
}

function updateById() {
  const id = document.getElementById('itemId').value;
  if (!id) {
    document.getElementById('info').innerText = '请输入菜单项 id';
    return;
  }
  if (!selectedAttrName) {
    document.getElementById('info').innerText = '请选择要更改的属性';
    return;
  }

  const value = document.getElementById('targeValue').value;

  // 更新菜单项属性，返回更新后的数值
  client
    .put(`/items/${id}`, { name: selectedAttrName, value: value })
    .then(res => {
      const { status, body } = res;
      if (status === 200) {
        const isSuccess = body.success;
        client.get(`/items/${id}`).then(res => {
          const { status, body } = res;
          if (status === 200) {
            const item = body.item || {};
            document.getElementById('info').innerText =
              `更新操作：${isSuccess}; \n` +
              JSON.stringify(item.toJSON ? item.toJSON() : item, null, 4);
          }
        });
      }
    })
    .catch(err => {
      document.getElementById('info').innerText =
        `更新失败： \n` + JSON.stringify(err, null, 4);
    });
}
storiesOf('API - put', module)
  .addParameters(wInfo(mdPutNode))
  .addWithJSX('/items/:id 更改菜单项信息', () => {
    return (
      <Row style={styles.demoWrap}>
        <Col span={10} offset={4}>
          <Row>
            <Col span={4}>
              <Input placeholder="菜单项 ID" id="itemId" />
            </Col>
            <Col span={4}>
              <Select
                style={{ width: 200 }}
                onChange={handleChange}
                placeholder="要更改的属性"
              >
                <Option value="name">name</Option>
                <Option value="type">type</Option>
                <Option value="disabled">disabled</Option>
                <Option value="icon">icon</Option>
                <Option value="shortcut">shortcut</Option>
                <Option value="visible">visible（菜单）</Option>
                <Option value="width">width（菜单）</Option>
                <Option value="left">left（菜单）</Option>
                <Option value="top">top（菜单）</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Input placeholder="新属性值" id="targeValue" />
            </Col>
            <Col span={10}>
              <Button onClick={updateById}>更改菜单项属性</Button>
              <Button onClick={updateMenuAttr}>更改整个菜单属性</Button>
              <Button onClick={createNew}>创建随机树</Button>
            </Col>
          </Row>

          <ContextMenuWithStore onClickItem={onClickItem} />
        </Col>
        <Col span={12}>
          <div id="info" />
        </Col>
      </Row>
    );
  });
