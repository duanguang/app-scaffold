import { schedule } from '@/utils/schedule';
import Store,{ getInjector } from 'brain-store';
import { useEffect,useRef,useState } from 'react';
import { StoreBase } from './store.base';
export const useStore = <S extends StoreBase>(store: { new(context: any): S },options?: {
  schedules?: Array<Function>;
}): S => {
  const _store = useState<S>(() => {
    return getInjector()?.getState(store,true);
  })[0];
  const _schedule = useRef<ReturnType<typeof schedule>>(null);
  options = options || {};
  useEffect(() => {
    if (options?.schedules) {
      //@ts-ignore
      _schedule.current = _store.schedule(options.schedules)
    }
    return () => {
      _schedule.current && _schedule.current.unsubscribe()
    }
  },[])
  return _store;
};
export { resource,Lifecycle,getInjector,setInjector,StoreModules,inject } from 'brain-store';
export { computed,action,autorun,observable } from 'mobx';
export { Store };
export { bind,Provider } from 'brain-store-react';
export {observer} from 'mobx-react-lite';