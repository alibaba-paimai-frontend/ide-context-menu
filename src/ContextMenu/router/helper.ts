import { debugInteract } from '../../lib/debug';
import { IStoresModel } from '../../index';

interface IArea {
  stores: IStoresModel;
  area: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export const areaCache = new Map<String, IArea>();

/**
 * 当点击非右键菜单区域，将自动隐藏右键菜单
 */
document.addEventListener('click', _handleClick);
function _handleClick(event: MouseEvent) {
  const { clientX, clientY } = event;
  if (areaCache.size) {
    for (let value of areaCache.values()) {
      const { stores, area } = value;
      const { x, y, w, h } = area;
      // 开始隐藏对应的菜单
      debugInteract(`准备隐藏 id 为：${stores.id} 的右键菜单;`);
      const wasOutSide = !(
        clientX > x &&
        clientX < x + w &&
        clientY > y &&
        clientY < y + h
      );
      if (stores.visible && wasOutSide) {
        stores.setVisible(false); // 更新状态
        // 同时从 cache 中清理出去
        areaCache.delete(stores.id);
        debugInteract(`已隐藏 id 为：${stores.id} 的右键菜单;`);
      }
    }
  }
}
