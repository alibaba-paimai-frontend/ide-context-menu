import styled from 'styled-components';
import { Menu } from 'antd';
import { IContextMenuProps } from './index';


const MenuItem = Menu.Item;

interface IStyledProps extends IContextMenuProps {
  style?: React.CSSProperties;
  className?: string;
  [prop: string]: any;
}

export const MenuContainer = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {}  // 优先级会高一些，行内样式
})`
  display: ${(props: IStyledProps) => (props.visible ? 'block' : 'none')};
  position: fixed;
  left: ${(props: IStyledProps) => props.left || 0}px;
  top: ${(props: IStyledProps) => props.top || 0}px;
  background: white;
  box-shadow: 0px 2px 10px #999999;
  z-index: 9;
`;

export const StyledMenu = styled(Menu)`
  width: ${(props: IStyledProps) => props.width || 200}px;
`;

export const StyledMenuItem = styled(MenuItem)`
  .menuWrap & {
    display: flex;
    min-width: 160px;
    justify-content: space-between;
  }
`;
