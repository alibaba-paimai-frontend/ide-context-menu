import { debugInteract } from './debug';
export function invariant(check: boolean, message: string, thing?: string) {
  if (!check) {
    throw new Error(
      '[ide-view] Invariant failed: ' +
        message +
        (thing ? " in '" + thing + "'" : '')
    );
  }
}

export function isExist(val: any): boolean {
  return typeof val !== 'undefined' && val !== null;
}

export function isTrue(val: any): boolean {
  return val === 'true' || val === true;
}

// from mobx
export function uniq(arr: any[]) {
  var res: any[] = [];
  arr.forEach(function(item) {
    if (res.indexOf(item) === -1) res.push(item);
  });
  return res;
}

/**
 * convert string map to object
 *
 * @export
 * @param {Map<string, any>} strMap
 * @returns
 */
export function strMapToObj(strMap: Map<string, any>) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

export function pick(object: any, paths: string[]) {
  const obj: any = {};
  for (const path of paths) {
    if (object[path]) {
      obj[path] = object[path];
    }
  }
  return obj;
}

export function capitalize(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface IPosition {
  x: number;
  y: number;
}
interface ISize {
  w: number;
  h: number;
}
export function getAdjustedPostion(
  targetPositon: IPosition,
  menuSize: ISize,
  bias = 10
): IPosition {
  const { x, y } = targetPositon;
  const { w, h } = menuSize;

  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const right = screenW - x > w; // 判断是否应该在 targetPosition 的右边
  const bottom = screenH - y > h; // 判断是否应该在 targetPosition 的下边

  const result = { x: 0, y: 0 };

  if (right) {
    result.x = x + bias;
  } else {
    result.x = x - w - bias;
  }

  if (bottom) {
    if(y + h > screenH) {
      result.y = screenH - h;
    } else {
      result.y = y + bias;
    }
  } else {
    result.y = y - h;
  }

  debugInteract(
    `事件位置（${x}, ${y}）\n当前屏幕尺寸（${screenW}, ${screenH}）\n 菜单尺寸（${w}, ${h}）\n计算方位 right: ${right},bottom: ${bottom} \n 计算结果坐标{x:${
      result.x
    } ,y:${result.y}}`
  );

  return result;
}
