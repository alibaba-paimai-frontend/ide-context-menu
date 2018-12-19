import * as React from 'react';
import { render } from 'react-dom';
import { ContextMenu, IMenuObject } from '../src/';

const menu: IMenuObject = {
  id: '111',
  name: 'demo',
  children: [{
      id:'222',
      name:'mmmm',
      type: 'normal',
      icon: 'up'
  }]
};
render(<ContextMenu visible={true} menu={menu} />, document.getElementById(
  'example'
) as HTMLElement);
