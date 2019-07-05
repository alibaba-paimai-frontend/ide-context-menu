import React, { useCallback, useReducer, useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';

import { debugInteract } from '../../../lib/debug';
import { StyledMenu, StyledMenuItem } from './styles';


import { observer } from 'mobx-react-lite';

export enum EMenuItemType {
    NORMAL = 'normal',
    SEPARATOR = 'separator'
}

export const MENU_TYPES = Object.values(EMenuItemType);

export interface IMenuSubjectEvent {
    /**
     * 点击菜单条目的回调函数
     */
    onClickItem?: (key: string, keyPath: Array<string>, item: any) => void;
}

export interface IMenuItemProps {
    id: string;
    name: string;
    icon: string;
    type?: string;
    disabled?: boolean;
    shortcut?: string;
}

export interface IMenuObject {
    id: string;
    name: string;
    children?: IMenuItemProps[];
}

export interface IMenuSubjectProps extends IMenuSubjectEvent {
    /**
     * 菜单项对象
     */
    menu?: IMenuObject;

    /**
     * 菜单宽度
     */
    width?: number | string;
}


export const MenuSubject = observer((props: IMenuSubjectProps) => {
    const { menu, width } = props;
    const { children = [] } = menu;
    const onClickMenuItem = (event: any) => {
        const { onClickItem } = props;
        const { item, key, keyPath } = event;
        debugInteract(`[点击菜单]key: ${key}; keyPath: ${keyPath}; item:`, item);
        onClickItem && onClickItem(key, keyPath, item);
    };

    return (
        <StyledMenu
            width={width}
            className={'menuWrap'}
            onClick={onClickMenuItem}
            mode="vertical"
        >
            {(children as any).slice().map((item: any, index: number) => {
                const isDivider =
                    item.isDivider || item.type === EMenuItemType.SEPARATOR;
                return isDivider ? (
                    <Menu.Divider key={item.id + index} /> // 菜单中有可能存在多个分隔符，key 应该要不一样
                ) : (
                        <StyledMenuItem
                            className={'menuItem'}
                            disabled={item.disabled}
                            key={item.id}
                        >
                            <div className={'content'}>
                                {item.icon ? <Icon type={item.icon} /> : null}
                                <span>{item.name}</span>
                            </div>
                            {item.shortcut ? (
                                <span className={'shortcut'}>{item.shortcut}</span>
                            ) : null}
                        </StyledMenuItem>
                    );
            })}
        </StyledMenu>
    );
});
MenuSubject.displayName = 'MenuSubject';

