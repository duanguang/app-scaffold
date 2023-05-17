import { StoreMeta } from '@typing/core.store';
import { Store } from './core.store';
import { schedule } from '@/utils/schedule';
export interface resourceEvent<T> {
  /**
   * 事件名称
   * @type {string}
   */
  name: string;

  /**
   * 事件作用域
   * @type {string}
   */
  scope: string;

  /**
   * 派发数据对象
   * @type {T}
   */
  payload: T;
}
export class StoreBase<T = {}> extends Store<T> {
  static meta: StoreMeta = {
    ...Store.meta,
    namespace: 'legions-ci-cd',
  };
  /**
   *
   * 订阅数据，在数据变化时，可以处理一些副作用，当你不需要监听时，请及时调用取消调用进行销毁
   * @param {...Array<any>} funcs 数组内第一个参数一定为函数类型
   * @returns {Array<Function>}
   * @memberof StoreBase
   */
  schedule(...funcs: Array<any>): ReturnType<typeof schedule> {
    return schedule(...funcs);
  }
}
