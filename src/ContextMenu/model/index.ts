import { IAnyModelType } from 'mobx-state-tree';
import { capitalize, invariant, isExist } from 'ide-lib-utils';
export * from './menu';

import { MenuModel } from './menu';

interface IPosition {
    x?: number;
    y?: number;
}


export const modelExtends = (model: IAnyModelType) => {
    return model.actions(self => {
        return {
            /**
             * 更新位置
             * 影响属性：left, top
             * @param position {x?,y?} 位置属性
             */
            setPostion(position: IPosition) {
                if (!position) return false;
                const { x, y } = position;
                if (isExist(x)) {
                    self.setLeft(x);
                }
                if (isExist(y)) {
                    self.setTop(y);
                }
                return true;
            }
        };
    })
};

