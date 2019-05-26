import styled from 'styled-components';
// import { desaturate } from 'polished';
import { IBaseStyledProps } from 'ide-lib-base-component';
import { IContextMenuProps } from './index';
import { Menu } from 'antd';

const MenuItem = Menu.Item;

interface IStyledProps extends IContextMenuProps, IBaseStyledProps {}


export const MenuContainer = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {}  // 优先级会高一些，行内样式
})<IStyledProps>`
  display: ${(props: IStyledProps) => (props.visible ? 'block' : 'none')};
  position: fixed;
  left: ${(props: IStyledProps) => props.left || 0}px;
  top: ${(props: IStyledProps) => props.top || 0}px;
  background: white;
  box-shadow: 0px 2px 10px #999999;
  z-index: 9;
`;

