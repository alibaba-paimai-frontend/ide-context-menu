import styled from 'styled-components';
// import { desaturate } from 'polished';
import { IBaseStyledProps } from 'ide-lib-base-component';
import { IMenuSubjectProps } from './index';
import { Menu } from 'antd';

const MenuItem = Menu.Item;

interface IStyledProps extends IMenuSubjectProps, IBaseStyledProps {}


export const StyledMenu = styled(Menu)<IStyledProps>`
  width: ${(props: IStyledProps) => props.width || 200}px;
`;

export const StyledMenuItem = styled(MenuItem)<IStyledProps>`
  .menuWrap & {
    display: flex;
    min-width: 160px;
    justify-content: space-between;
  }
`;

